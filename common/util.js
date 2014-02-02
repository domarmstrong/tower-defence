/**
 * Inherit from a constructor and extend with properties from properties
 */
module.exports.inherit = function (parent, constructor, properties) {
    var proto = Object.create(parent.prototype); 
    Object.keys(properties).forEach(function (key) {
        proto[key] = properties[key]; 
    });
    proto.constructor = constructor;
    constructor.prototype = proto;
};

/**
 * Extend a with b overwiting properties
 */
module.exports.extend = function (a, b) {
    Object.keys(b).forEach(function (key) {
        a[key] = b[key];
    });
};
