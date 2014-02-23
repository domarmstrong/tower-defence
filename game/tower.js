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
        range: 1,
        background: 'red'
    },
    click: function click(event) {
        this.super(x.ui.Rect, 'click', event);
        this.props.level.set({'selected': this});
    },
    draw: function draw(page, cx) {
        this.state.size = this.props.grid.state.size - 1;
        this.state.h = this.state.w = this.state.size;
        this.super(x.ui.Rect, 'draw', page, cx);
    }
});
module.exports.Basic = Basic;

function Arrow(props) {
    this.init.apply(this, arguments);
}
x.util.inherit(Basic, Arrow, {
    init: function init(props) {
        this.super(Basic, 'init', props);
    },
    defaults: {
        range: 2,
        background: 'green'
    }
});
module.exports.Arrow = Arrow;

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
            this.Tower = Arrow;
        }
        this.setup();
    },
    setup: function () {
        var self = this;
        self.props.dragStart = function (event) {
            event.propagate = false;
            self.tower = new self.Tower({
                level: this.props.level,
                grid: this.props.grid,
                click: function (event) {
                    //console.log(self.x(), self.state);
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
                    x: self.mouseX(gridSq.actualX + (gridSq.size / 2) + 0.5),
                    y: self.mouseY(gridSq.actualY + (gridSq.size / 2) + 0.5)
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
