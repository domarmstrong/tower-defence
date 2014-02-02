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
    draw: function draw(cx) {
        var _ = this.state.shape;
        cx.fillStyle = this.state.background;
        cx.fillRect(this.x(_.x), this.y(_.y), this.w(_.w), this.h(_.h));
    },
});
module.exports.Rect = Rect;

function Text(props) {
    this.init(props);
}
util.inherit(base.Base, Text, {
    init: function init(props) {
        this.super(base.Base, 'init', props);
    },
    defaults: {
        font: 'bold 18px sans-serif',
        textAlign: 'center',
        textBaseline: 'middle',
        fillStyle: '#000000'
    },
    draw: function draw(cx) {
        var s = this.state;
        if (!s.text) return;
        var _ = this.bound.state.shape;
        cx.font = this.state.font;
        cx.textAlign = this.state.textAlign;
        cx.textBaseline = this.state.textBaseline;
        cx.fillStyle = this.state.color;
        console.log(this.w());
        cx.fillText(s.text, this.x() + (this.w() / 2), this.y() + (this.h() / 2));
    }
});
module.exports.Text = Text;
