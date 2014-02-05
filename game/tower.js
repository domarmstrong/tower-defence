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
        size: 20,
        background: 'red'
    },
    draw: function draw(page, cx) {
        this.super(x.ui.Rect, 'draw', page, cx);
    }
});
module.exports.Basic = Basic;

function TowerButton(props) {
    this.init.apply(this, arguments);
}
x.util.inherit(x.ui.Rect, TowerButton, {
    init: function init(props) {
        this.super(x.ui.Rect, 'init', props);
        switch (props.tower) {
        case 'Basic':
            this.state.background = 'grey'
            this.Tower = Basic;
            break;
        case 'Arrow':
            this.state.background = '#444'
            this.Tower = Basic;
        }
        this.setup();
    },
    setup: function () {
        var self = this;
        window.x = this.props.bound;
        this.props.dragStart = function (event) {
            self.tower = new self.Tower({
                w: 20, h: 20,
                click: function (event) {
                    console.log(this);
                }
            });
            self.tower.screen = self.bound.screen;
            self.props.bound.children.push(self.tower);
        };
        this.props.drag = function (event) {
            self.tower.set({ x: this.mouseX(event.offsetX), y: this.mouseY(event.offsetY) });
        };
    },
    mouseX: function (x) {
        return x - this.props.bound.x() - (this.tower.w() / 2);
    },
    mouseY: function (y) {
        return y - this.props.bound.y() - (this.tower.h() / 2);
    }
});
module.exports.TowerButton = TowerButton;
