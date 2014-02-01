function Mouse() {
    this.screen;
}
Mouse.prototype = {
    registerScreen: function registerScreen(screen) {
        this.screen = screen;
    },
    move: function move(event) {
    },
    click: function click(event) {
        if (!this.screen) return;
        for (var i = 0; i < this.screen.controls.length; i++) {
            var it = this.screen.controls[i];
            if (!it.click) continue;
            it.click(event);
        }
    }
};
module.exports = Mouse;
