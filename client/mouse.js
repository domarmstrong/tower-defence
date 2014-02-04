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
    handle: function handle(event, action) {
        this.setEvent(event);
        event.propagate = true;
        if (this.screen) this.bubble(action, this.screen.root.children);
    },
    bubble: function bubble(action, children) {
        var i = children.length - 1;
        // Loop backwards because last drawn object will always be ontop
        for (; i >= 0; i--) {
            var widget = children[i];
            if (widget.children) {
                this.bubble(action, widget.children);
            }
            if (widget[action] && this.collision(widget)) {
                if (! event.propagate) return;
                widget[action](this.event);
            }
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
            var _ = w.state,
                o = this.getOffset();
            if (
                (o.x > w.x(_.x) && o.x < w.x(_.x) + w.w()) &&
                (o.y > w.y(_.y) && o.y < w.y(_.y) + w.h())
            ) {
                return true;
            }
            return false;
        }
    }
};
module.exports = Mouse;
