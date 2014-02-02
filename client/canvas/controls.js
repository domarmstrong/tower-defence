var util = require('../../common/util');

function Control() {
}
Control.prototype = {
    set: function set(obj) {
        this.state = util.extend(this.state, obj);
        this.screen.draw();
    }
};


function Button(props) {
    this.props = props;
    this.state = util.extend({}, this.defaults);
    this.state = util.extend(this.state, this.props);
    this.state.shape = {
        x: props.x, 
        y: props.y, 
        w: props.w, 
        h: props.h 
    };
}
Button.prototype = util.inherit(Control, {
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
module.exports = {
    'Button': Button
};
