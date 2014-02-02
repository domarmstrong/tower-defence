var util = require('../../common/util');
var base = require('./base');
module.exports = {};

function Button(props) {
    this.init(props);
}
util.inherit(base.Base, Button, {
    init: function init(props) {
        this.state.shape = {
        this.super(Bound, 'init', props);
            x: props.x, 
            y: props.y, 
            w: props.w, 
            h: props.h 
        };
    },
    shape: 'rect',
    defaults: {
        background: '#222555',
        color: '#FFFFFF',
    },
    draw: function draw(c) {
        var _ = this.state.shape;
        c.fillStyle = this.state.background;
        c.fillRect(_.x, _.y, _.w, _.h);
        this.text(c);
    },
    text: function text(c) {
        var p = this.props;
        var _ = this.state.shape;
        if (! p.text) return;
        c.font = 'bold 18px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = this.state.color;
        c.fillText(p.text, _.x + _.w / 2, _.y + _.h / 2)
    },
    click: function click(event) {
        if (this.props.click) {
            this.props.click.call(this);
        }
    }
});
module.exports.Button = Button;
