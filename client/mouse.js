function Mouse() {
    this.screen;
    this.event;
}
Mouse.prototype = {
    setEvent: function setEvent(event) {
        this.event = event;
    },
    registerScreen: function registerScreen(screen) {
        this.screen = screen;
    },
    getOffset: function getOffset() {
        return {
            x: this.event.offsetX,
            y: this.event.offsetY
        }
    },
    move: function move(event) {
        //this.action(event, 'move');
    },
    click: function click(event) {
        this.action(event, 'click');
    },
    action: function action(event, action) {
        this.setEvent(event);
        if (!this.screen) return;
        var widget = this.search(action, this.screen.controls);
        if (widget) widget[action](this.event);
    },
    search: function search(action, children) {
        var i = children.length - 1;
        // Loop backwards because last drawn object will always be ontop
        while (i + 1) {
            var widget = children[i];
            if (widget.children) {
                var found = this.search(action, widget.children);
                if (found) return found;
            }
            if (widget.props[action] && this.collision(widget)) {
                return widget
            }
            i--;
        }
    },
    collision: function collision(widget) {
        if (widget.shape) {
            return this._collision[widget.shape].call(this, widget);
        }
    },
    _collision: {
        'rect': function (widget) {
            var w = widget;
            var _ = w.state.shape,
                o = this.getOffset();
            if (
                (o.x > w.x(_.x) && o.x < w.x(_.x) + w.w()) &&
                (o.y > w.y(_.y) && o.y < w.y(_.y) + w.h())
            ) {
                return true;
            }
        }
    }
};
module.exports = Mouse;
