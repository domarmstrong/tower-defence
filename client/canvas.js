function Canvas() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
}
Canvas.prototype = {
    draw: function draw() {

    },
    clear: function clear() {
        this.canvas.width = this.canvas.width;
    }
};
module.exports = Canvas;
