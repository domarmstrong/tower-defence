var util = require('../../common/util');
var base = require('./base');
var shape = require('./shape');
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
        this.super(Bound, 'draw', c);
        if (this.state.text) {
            var text = new shape.Text({
                'text': this.state.text,
                'color': this.state.color
            })
            text.setBound(this);
            text.draw(c);
        }
    },
    click: function click(event) {
        if (this.props.click) {
            this.props.click.call(this);
        }
    }
});
module.exports.Button = Button;
