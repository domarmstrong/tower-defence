/**
 * Inherit from a constructor and extend with properties from properties
 */
module.exports.inherit = function (parent, constructor, properties) {
    var proto = Object.create(parent.prototype); 
    Object.keys(properties).forEach(function (key) {
        proto[key] = properties[key]; 
    });
    proto.constructor = constructor;
    proto.parentClass = parent;
    constructor.prototype = proto;
};

/**
 * Creates a copy of a and then extend overwiting with properties from b
 * Return a new object
 */
module.exports.extend = function (a, b) {
    var obj = {};
    Object.keys(a).forEach(function (key) {
        obj[key] = a[key];
    });
    Object.keys(b).forEach(function (key) {
        obj[key] = b[key];
    });
    return obj;
};
