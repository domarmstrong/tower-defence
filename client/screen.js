function Screen(controls) {
    this.controls = controls;
}
Screen.prototype = {
    start: function (canvas) {
        this.canvas = canvas;
        this.draw();
    },
    draw: function draw() {
        this.canvas.clear();
        for (var i = 0; i < this.controls.length; i++) {
            widget = this.controls[i];
            widget.screen = this;
            widget.draw(this.canvas.cx);
        }
    },
};

module.exports = Screen;
