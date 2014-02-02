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
util.inherit(base.Base, Grid, {
    init: function init(props) {
        this.super(base.Base, 'init', props);
    },
    defaults: {
        strokeStyle: '#FF0000',
        lineWidth: 1,
        size: 20
    },
    draw: function draw(page, cx) {
        this.super(base.Base, 'draw', page, cx);
        var s = this.state;
        var w = this.w();
        var h = this.h();
        var xCount = w / s.size;
        var yCount = h / s.size;
        var xOffset = ((w / xCount) * (xCount % 1)) / 2;
        var yOffset = ((h / yCount) * (yCount % 1)) / 2;
        cx.strokeStyle = s.strokeStyle;
        cx.lineWidth = s.lineWidth;

        // Vertical lines
        // draw the first line or not
        var i = yOffset == 0 ? 1 : 0;
        for (; i <= yCount; i++) {
            cx.beginPath();
            cx.moveTo(
                xOffset + this.x(),
                yOffset + this.y(i * s.size) + 0.5
            );
            cx.lineTo(
                this.x(xCount * s.size) - xOffset,
                this.y(i * s.size) + 0.5 + yOffset
            );
            cx.stroke();
        }

        // Horizontal lines
        // draw the first line or not
        var i = xOffset == 0 ? 1 : 0;
        for (; i <= yCount; i++) {
            cx.beginPath();
            cx.moveTo(
                xOffset + this.x(i * s.size) + 0.5,
                yOffset + this.y()
            );
            cx.lineTo(
                xOffset + this.x(i * s.size) + 0.5,
                this.y(yCount * s.size) - yOffset
            );
            cx.stroke();
        }
    }
});
module.exports.Grid = Grid;
