var x = require('canvas-x');
module.exports = {};

function Level(props) {
    this.init.apply(this, arguments);
}
x.util.inherit(x.ui.Rect, Level, {
    init: function init(props) {
        this.super(x.ui.Rect, 'init', props);
        this.state.selected = null;
    },
    showFireRange: function showFireRange(cx) {
        var selected = this.state.selected;
        var gridSize = this.props.grid.state.size;
        var centerX = selected.state.x + (selected.state.size / 2);
        var centerY = selected.state.y + (selected.state.size / 2);
        var radius = (selected.state.range + 0.5) * gridSize;

        cx.beginPath();
        cx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        cx.lineWidth = 2;
        cx.strokeStyle = 'yellow';
        cx.stroke();
    },
    click: function click(event) {
        this.super(x.ui.Rect, 'click', event);
        this.set({'selected': null});
    },
    draw: function draw(page, cx) {
        this.super(x.ui.Base, 'draw', page, cx); 
        if (this.state.selected) {
            this.showFireRange(cx);
        }
    }
});
module.exports.Level = Level;
