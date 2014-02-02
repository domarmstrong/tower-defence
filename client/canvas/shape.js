var util = require('../../common/util');
var base = require('./base');
module.exports = {};

function Rect(props) {
    this.init(props);
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
    draw: function draw(c) {
        var _ = this.state.shape;
        c.fillStyle = this.state.background;
        c.fillRect(_.x, _.y, _.w, _.h);
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
    draw: function draw(c) {
        var p = this.props;
        var _ = this.bound.state.shape;
        c.font = this.state.font;
        c.textAlign = this.state.textAlign;
        c.textBaseline = this.state.textBaseline;
        c.fillStyle = this.state.color;
        c.fillText(p.text, _.x + _.w / 2, _.y + _.h / 2)
    }
});
module.exports.Text = Text;
