module.exports = {};
function reexport(mod) {
    Object.keys(mod).forEach(function (key) {
        module.exports[key] = mod[key];
    });
}

reexport(require('./canvas/controls'));
reexport(require('./canvas/shape'));
