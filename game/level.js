var x = require('../client/x');
module.exports = {};

function Level(props) {
    this.state = {
        selected: null
    };
}
x.util.inherit(x.Class, Level, {});
module.exports.Level = Level;
