var ui = require('./ui');

function Screen(controls) {
    this.init.apply(this, arguments);
}
Screen.prototype = {
    init: function (controls) {
        this.controls = controls;
    },
    start: function (canvas) {
        this.canvas = canvas;
        this.root = new ui.Bound({
            x: 0, y: 0, h: canvas.c.height, w: canvas.c.width
        }, this.controls);
        this.draw();
    },
    draw: function draw() {
        this.root.draw(this.canvas.cx);
    },
};

module.exports = Screen;
