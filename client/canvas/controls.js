var util = require('../../common/util');
var base = require('./base');
var shape = require('./shape');
var mixins = require('./mixins');
module.exports = {};

function Bound(props, children) {
    this.init.apply(this, arguments);
}
util.inherit(shape.Rect, Bound, {
    init: function init(props, children) {
        this.super(shape.Rect, 'init', props);
        this.children = children || [];
    },
    draw: function (cx) {
        this.super(shape.Rect, 'draw', cx);
        this.drawChildren(cx);
    },
});
mixins.children(Bound);
module.exports.Bound = Bound;


function Button(props) {
    this.init.apply(this, arguments);
}
util.inherit(Bound, Button, {
    init: function init(props, children) {
        this.super(Bound, 'init', props, children);
    },
    defaults: {
        background: '#222555',
        color: '#FFFFFF',
    },
    draw: function draw(cx) {
        this.children = [
            new shape.Text({
                'text': this.state.text,
                'color': this.state.color
            }).setBound(this)
        ];
        this.super(Bound, 'draw', cx);
    },
    click: function click(event) {
        if (this.props.click) {
            this.props.click.call(this);
        }
    }
});
module.exports.Button = Button;
