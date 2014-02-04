var x = require('../client/x');
module.exports = {};


function Basic(props) {
    this.init.apply(this, arguments);
}
x.util.inherit(x.ui.Rect, Basic, {
    init: function init(props) {
        this.super(x.ui.Rect, 'init', props);
    },
    defaults: {
        strokeStyle: '#FF0000',
        lineWidth: 1,
        size: 20
    },
    draw: function draw(page, cx) {
        this.screen = page;
        if (! this.state.background) return;
        var _ = this.state;
        cx.fillStyle = this.state.background;
        if (_.dragging) {
            cx.fillRect(this.x(_.x) - (_.h / 2), this.y(_.y) - (_.w / 2), this.w(_.w), this.w(_.h));
        } else {
            cx.fillRect(this.x(_.x), this.y(_.y), this.w(_.w), this.w(_.h));
        }
    }
});
module.exports.Basic = Basic;
