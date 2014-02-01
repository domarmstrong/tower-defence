var Screen = require('../screen');
var ui = require('../ui');
module.exports = function (game) {
return new Screen([
    new ui.Button({
        x: 20, y: 90, w: 100, h: 50,
        text: 'Other',
        click: function () {
            game.go('home');
        }
    })
]);
};
