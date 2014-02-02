var util = require('../../common/util');
module.exports = {};

function Base(props) {
    this.init.apply(this, arguments);
}
Base.prototype = {
    init: function init(props) {
        this.props = props
        this.state = {};
        if (this.defaults) {
            util.extend(this.state, this.defaults);
        }
        util.extend(this.state, this.props);
    },
    super: function(superClass, method) {
        var args = Array.prototype.slice.call(arguments, 2);
        superClass.prototype[method].apply(this, args);
    },
    isPercent: new RegExp(/[0-9]%$/),
    set: function set(obj) {
        util.extend(this.state, obj);
        this.screen.draw();
        return this;
    },
    setBound: function setBound(widget) {
        this.bound = widget;
        return this;
    },
    x: function (x) {
        return this.getCoordinate('x', x);
    },
    y: function (y) {
        return this.getCoordinate('y', y);
    },
    h: function () {
        return this.getValue('h');
    },
    w: function () {
        return this.getValue('w');
    },
    getCoordinate: function (axis, n) {
        // Return the coordinate offset by its container;
        if (n == undefined) n = 0;
        if (!this.bound) return n;
        return this.bound[axis](this.bound.state[axis]) + n;
    },
    getValue: function (which) {
        var n = this.state[which];
        if (n === undefined) n = this.bound.getValue(which);

        if (typeof n == 'string') {
            if (this.isPercent.test(n)) {
                var b = this.bound.getValue(which);
                var n = Number(n.split('').slice(0, n.length-1).join(''));
                return (b / 100) * n;
            }
            return Number(n);
        }
        return n;
    }
};
module.exports.Base = Base;
