var util = require('../util');
module.exports = {};

module.exports.children = function children(constructor) {
    var proto = constructor.prototype;
    util.extend(proto, {
        drawChildren: function (page, cx) {
            var widget;
            for (var i = 0; i < this.children.length; i++) {
                widget = this.children[i];
                widget.screen = this;
                widget.setBound(this).draw(page, cx);
            }
        }
    });
};

var dragCharge = 0,
    dragStart = null,
    drag = null,
    dragStop = null;

var events = {
    click: function (event) {
        if (this.props.click) this.props.click(event);
    },
    mousemove: function (event) {
        if (this.props.mousemove) this.props.mousemove(event);
        if (event.which == 0) {
            dragStart = drag = dragStop = null;
            dragCharge = 0;
        }
        if (event.which == 1 && dragStart == this && dragCharge < 2) {
            dragCharge++;
        } else if (dragStart == this && dragCharge > 1 && !drag) {
            var widget = this;
            drag = true;
            if (widget.props.dragStart) {
                widget.props.dragStart.call(widget, event);
            }
            if (widget.props.drag) {
                drag = function (event) {
                    widget.props.drag.call(widget, event);
                };
            }
            if (widget.props.dragStop) {
                dragStop = function (event) {
                    widget.props.dragStop.call(widget, event);
                };
            }
        } else if (drag && typeof drag == 'function') {
            drag(event);
        }
    },
    mousedown: function (event) {
        if (this.props.mousedown) this.props.mousedown(event);
        if (this.props.drag || this.props.dragStart || this.props.dragStop) {
            event.propagate = false;
            dragStart = this;
        }
    },
    mouseup: function (event) {
        if (this.props.mouseup) this.props.mouseup(event);
        if (dragStop) {
            event.propagate = false;
            dragStop(event);
        }
    }
};
module.exports.mouseEvents = function mixins(constructor) {
    var proto = constructor.prototype;
    util.extend(proto, events);
};
