var util = require('../../common/util');
var base = require('./base');
var shape = require('./shape');
module.exports = {};

function Bound(props) {
    this.init(props);
}
util.inherit(shape.Rect, Bound, {
    init: function init(props) {
        this.super(shape.Rect, 'init', props);
    }
});
module.exports.Bound = Bound;


function Button(props) {
    this.init(props);
}
util.inherit(Bound, Button, {
    init: function init(props) {
        this.super(Bound, 'init', props);
    },
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
