var util = require('../../common/util');
var base = require('./base');
module.exports = {};

function Rect(props) {
    this.init.apply(this, arguments);
}
util.inherit(base.Base, Rect, {
    init: function init(props) {
        this.super(base.Base, 'init', props);
        this.state.shape = {
            x: props.x,
            y: props.y,
            w: props.w,
            h: props.h
        };
    },
    shape: 'rect',
    draw: function draw(page, cx) {
        this.super(base.Base, 'draw', page, cx);
        var _ = this.state.shape;
        cx.fillStyle = this.state.background;
        cx.fillRect(this.x(_.x), this.y(_.y), this.w(_.w), this.h(_.h));
    },
});
module.exports.Rect = Rect;


function Text(props) {
    this.init.apply(this, arguments);
}
util.inherit(base.Base, Text, {
    init: function init(props) {
        this.super(base.Base, 'init', props);
    },
    defaults: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        textBaseline: 'middle',
        fillStyle: '#000000'
    },
    getFont: function () {
        var s = this.state;
        return s.fontWeight + ' ' + s.fontSize + ' ' + s.fontFamily;
    },
    draw: function draw(page, cx) {
        this.super(base.Base, 'draw', page, cx);
        var s = this.state;
        if (!s.text) return;
        var _ = this.bound.state.shape;
        cx.font = this.getFont();
        cx.textAlign = this.state.textAlign;
        cx.textBaseline = this.state.textBaseline;
        cx.fillStyle = this.state.color;
        cx.fillText(s.text, this.x() + (this.w() / 2), this.y() + (this.h() / 2));
    }
});
module.exports.Text = Text;


function Grid(props) {
    this.init.apply(this, arguments);
}
util.inherit(Rect, Grid, {
    init: function init(props) {
        this.super(Rect, 'init', props);
    },
    defaults: {
        strokeStyle: '#FF0000',
        lineWidth: 1,
        size: 20
    },
    move: function move(event) {
        if (this.props.move) {
            this.props.move(event);
        }
        this.getSquare(
            event.offsetX,
            event.offsetY
        );
    },
    getSquare: function getSquare(x, y) {
        var s = this.state;
        var xOffset = this.getXOffset();
        var yOffset = this.getYOffset();
        var rows = this.getRows();
        var cols = this.getCols();

        x = x - this.x() - xOffset;
        y = y - this.y() - yOffset;

        if (
            x <= 0 || y <= 0 ||
            x + (xOffset * 2) >= (cols * s.size) ||
            y + (yOffset * 2) >= (rows * s.size)
        ) {
            this.square = null;
        } else {
            x = Math.floor(x / s.size) * s.size;
            y = Math.floor(y / s.size) * s.size;
            this.square = [x, y, this.state.size];
        }
        this.screen.draw();
    },
    getRows: function getRows() {
        return this.h() / this.state.size;
    },
    getCols: function getCols() {
        return this.w() / this.state.size;
    },
    getXOffset: function getOffset() {
        var cols = this.getCols();
        return Math.round(((this.w() / cols) * (cols % 1)) / 2);
    },
    getYOffset: function getYOffset() {
        var rows = this.getRows()
        return Math.round(((this.h() / rows) * (rows % 1)) / 2);
    },
    draw: function draw(page, cx) {
        this.super(base.Base, 'draw', page, cx);
        var s = this.state;
        cx.strokeStyle = s.strokeStyle;
        cx.lineWidth = s.lineWidth;

        var xOffset = this.getXOffset();
        var yOffset = this.getYOffset();
        var rows = this.getRows();
        var cols = this.getCols();

        if (this.square) {
            var sq = this.square;
            cx.fillStyle = 'red';
            cx.fillRect(
                this.x(sq[0]) + xOffset,
                this.y(sq[1]) + yOffset,
                sq[2], sq[2]);
        }

        // Horizontal lines
        // draw the first line or not
        var i = yOffset == 0 ? 1 : 0;
        for (; i <= rows; i++) {
            cx.beginPath();
            cx.moveTo(
                xOffset + this.x(),
                yOffset + this.y(i * s.size) + 0.5
            );
            cx.lineTo(
                this.x(cols * s.size) - xOffset,
                this.y(i * s.size) + 0.5 + yOffset
            );
            cx.stroke();
        }

        // Vertical lines
        // draw the first line or not
        var i = xOffset == 0 ? 1 : 0;
        for (; i <= cols; i++) {
            cx.beginPath();
            cx.moveTo(
                xOffset + this.x(i * s.size) + 0.5,
                yOffset + this.y()
            );
            cx.lineTo(
                xOffset + this.x(i * s.size) + 0.5,
                this.y(rows * s.size) - yOffset
            );
            cx.stroke();
        }
    }
});
module.exports.Grid = Grid;
