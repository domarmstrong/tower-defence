var Screen = require('../screen');
var ui = require('../ui');
module.exports = function (game) {
return new Screen([
    new ui.Button({
        x: 20, y: 20, w: 100, h: 50,
        text: 'A button',
        n: 0,
        click: function () {
            if (this.state.n == 0) {
                this.set({'color': 'red'});
                this.state.n = 1;
            } else if (this.state.n == 1) {
                this.set({'color': 'green'});
                this.state.n = 0;
            }
        }
    })
])
};
