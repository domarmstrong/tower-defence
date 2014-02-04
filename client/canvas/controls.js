var util = require('../util');
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
    draw: function (page, cx) {
        this.super(shape.Rect, 'draw', page, cx);
        this.drawChildren(page, cx);
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
    draw: function draw(page, cx) {
        var s = this.state;
        this.children = [
            new shape.Text({
                'text': s.text,
                'fontSize': s.fontSize,
                'fontWeight': s.fontWeight,
                'fontFamily': s.fontFamily,
                'color': s.color
            }).setBound(this)
        ];
        this.super(Bound, 'draw', page, cx);
    },
    click: function click(event) {
        event.propagate = false;
        if (this.props.click) {
            this.props.click.call(this);
        }
    }
});
module.exports.Button = Button;
