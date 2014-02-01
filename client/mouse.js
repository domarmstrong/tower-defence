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
        this.action(event, 'move');
    },
    click: function click(event) {
        this.action(event, 'click');
    },
    action: function action(event, action) {
        this.setEvent(event);
        if (!this.screen) return;
        var i = this.screen.controls.length - 1;
        // Loop backwards because last drawn object will always be ontop
        while (i + 1) {
            var widget = this.screen.controls[i];
            if (widget.props[action] && this.collision(widget)) {
                return widget[action](this.event);
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
            var _ = widget.state.shape,
                o = this.getOffset();
            if (
                (o.x > _.x && o.x < _.x + _.w) &&
                (o.y > _.y && o.y < _.y + _.h)
            ) {
                return true;
            }
        }
    }
};
module.exports = Mouse;
