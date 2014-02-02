var Screen = require('../screen');
var ui = require('../ui');
module.exports = function (game) {
return new Screen([
    new ui.Bound({
        x: 0, y: 0, h: '100%', w: 50,
        'background': '#222'
    }, [
        new ui.Button({
            x: 0, y: 0, w: '100%', h: 40,
            text: 'A',
            click: function () {
                console.log(this);
            }
        }),
        new ui.Button({
            x: 0, y: 50, w: '100%', h: 40,
            text: 'B',
            click: function () {
                console.log(this);
            }
        })
    ])
])
};
