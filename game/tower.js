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
        range: 60,
        background: 'red'
    },
    click: function click(event) {
        this.super(x.ui.Rect, 'click', event);
        this.props.level.set({'selected': this});
    },
    showFireRange: function showFireRange(cx) {
        var centerX = this.state.x + (this.state.size / 2);
        var centerY = this.state.y + (this.state.size / 2);
        var radius = this.state.range;

        cx.beginPath();
        cx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        cx.lineWidth = 3;
        cx.strokeStyle = '#003300';
        cx.stroke();
    },
    draw: function draw(page, cx) {
        this.super(x.ui.Rect, 'draw', page, cx);
        if (this.props.level.state.selected === this) {
            this.showFireRange(cx);
        }
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
        self.props.dragStart = function (event) {
            event.propagate = false;
            self.tower = new self.Tower({
                w: 20, h: 20,
                level: this.props.level,
                click: function (event) {
                    console.log(self.x(), self.state);
                }
            });
            self.tower.screen = self.bound.screen;
            self.props.bound.children.push(self.tower);
        };
        self.props.drag = function (event) {
            self.tower.set({ x: self.mouseX(event.offsetX), y: self.mouseY(event.offsetY) });
        };
        self.props.dragStop = function (event) {
            var gridSq = self.props.grid.square;
            if (gridSq) {
                self.tower.set({
                    x: self.mouseX(gridSq.actualX + (gridSq.size / 2)),
                    y: self.mouseY(gridSq.actualY + (gridSq.size / 2))
                });
            } else {
                self.tower.remove();
            }
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
