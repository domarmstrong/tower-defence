function Button(props) {
    this.props = props;
}
Button.prototype = {
    draw: function draw(c) {
        var p = this.props;
        c.fillStyle = '#222555';
        c.fillRect(p.x, p.y, p.w, p.h);
        this.text(c);
    },
    text: function text(c) {
        var p = this.props;
        if (! p.text) return;
        c.font = 'bold 18px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = '#FFFFFF';
        c.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2)
    },
    click: function click(event) {
        var p = this.props,
            x = event.offsetX,
            y = event.offsetY;
        if (
            (x > p.x && x < p.x + p.w) &&
            (y > p.y && y < p.y + p.h)
        ) {
            if (this.props.click) {
                this.props.click();
            }
        }
    }
};
module.exports = {
    'Button': Button
};
