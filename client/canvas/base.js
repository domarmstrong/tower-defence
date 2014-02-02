var util = require('../../common/util');

function Base(props) {
    this.init(props);
}
Base.prototype = {
    init: function init(props) {
        this.props = props;
        if (this.defaults) {
            this.state = util.extend({}, this.defaults);
        } else {
            this.state = {};
        }
        this.state = util.extend(this.state, this.props);
    },
    super: function(superClass, method) {
        var args = Array.prototype.slice.call(arguments, 2);
        superClass.prototype[method].apply(this, args);
    },
    set: function set(obj) {
        this.state = util.extend(this.state, obj);
        this.screen.draw();
    }
};
module.exports = {
    'Base': Base
};
