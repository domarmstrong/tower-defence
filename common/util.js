/**
 * Inherit from a constuctor and extend with properties from obj
 */
module.exports.inherit = function (parent, obj) {
    var proto = Object.create(parent.prototype); 
    Object.keys(obj).forEach(function (key) {
        proto[key] = obj[key]; 
    });
    return proto;
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
