function Screen(controls) {
    this.controls = controls;
}
Screen.prototype = {
    draw: function draw(canvas) {
        canvas.clear();
        for (var i = 0; i < this.controls.length; i++) {
            this.controls[i].draw(canvas.context);
        }
    }
};

module.exports = Screen;
