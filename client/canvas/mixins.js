var util = require('../../common/util');
module.exports = {};

module.exports.children = function (constructor) {
    var proto = constructor.prototype;
    util.extend(proto, {
        drawChildren: function (page, cx) {
            var widget;
            for (var i = 0; i < this.children.length; i++) {
                widget = this.children[i];
                widget.screen = this;
                widget.setBound(this).draw(page, cx);
            }
        }
    });
};
