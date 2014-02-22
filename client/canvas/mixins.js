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

var dragging = null;

function events() {
    var dragCharge = 0,
        onDragStart = null,
        onDrag = null,
        onDragStop = null;

    function startDrag(event, widget) {
        var p = widget.props;
        if (! (p.dragStart || p.drag || p.dragStop)) {
            return;
        }
        dragging = widget;
        if (widget.props.dragStart) {
            widget.props.dragStart.call(widget, event);
        }
        if (widget.props.drag) {
            onDrag = function (event) {
                widget.props.drag.call(widget, event);
            };
        }
        if (widget.props.dragStop) {
            onDragStop = function (event) {
                widget.props.dragStop.call(widget, event);
            };
        }
    }
    function stopDrag(event) {
        if (onDragStop) {
            onDragStop(event);
            event.propagate = false;
        }
        dragging = onDragStart = onDrag = onDragStop = null;
        dragCharge = 0;
    }

    return {
        click: function (event) {
            if (this.props.click) {
                this.props.click.call(this, event);
            }
        },
        mousemove: function (event) {
            if (this.props.mousemove) this.props.mousemove(event);
            if (event.which == 1 && dragCharge < 2) {
                dragCharge++;
            } else if (dragCharge > 1 && !dragging) {
                startDrag(event, this);
            } else if (onDrag) {
                onDrag(event);
            }
        },
        mousedown: function (event) {
            if (this.props.mousedown) {
                this.props.mousedown.call(this, event);
            }
        },
        mouseup: function (event) {
            if (dragging) {
                stopDrag(event, this);
            }
            if (this.props.mouseup) {
                this.props.mouseup(this, event);
            }
        },
    };
}
module.exports.mouseEvents = function mouseEvents(constructor) {
    var proto = constructor.prototype;
    util.extend(proto, events());
};
