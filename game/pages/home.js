var x = require('../../client/x');
var ui = x.ui;
var tower = require('../tower');
var levels = require('../level');

module.exports = function () {
var page = new x.Screen();

var level = new levels.Level();
level.screen = page;

var towers = new ui.Bound({
    id: 'towers'
});
var grid = new ui.Grid({
    id: 'grid',
    strokeStyle: '#FFFFFF',
    size: 26
});

var towerDefaults = {
    x: 5, w: 40, h: 40,
    bound: towers,
    grid: grid,
    level: level
};

page.controls = [
    new ui.Bound({
        background: '#ccc'
    }, [
        new ui.Bound({
            x: 50, y: 0, h: '100%', w: 750,
            background: '#555'
        }, [ grid ]),
        new ui.Bound({
            id: 'controls',
            x: 0, y: 0, h: '100%', w: 50,
            background: '#222'
        }, [
            new ui.Button({
                x: 5, y: 5, w: 40, h: 40,
                text: '+',
                fontSize: '35px',
                click: function () {
                    var grid = page.getWidget('grid');
                    grid.set({'size': grid.get('size') + 1});
                }
            }),
            new ui.Button({
                x: 5, y: 50, w: 40, h: 40,
                text: '-',
                fontSize: '35px',
                click: function () {
                    var grid = page.getWidget('grid');
                    grid.set({'size': grid.get('size') - 1});
                }
            }),
            new ui.Button({
                x: 5, y: 95, w: 40, h: 40,
                text: 'Reset',
                fontSize: '11px',
                click: function () {
                    var grid = page.getWidget('grid');
                    grid.set({'size': grid.props.size});
                }
            }),
            new tower.TowerButton(x.util.extend(
                {y: 150, tower: 'Basic'},
                towerDefaults
            )),
            new tower.TowerButton(x.util.extend(
                {y: 200, tower: 'Arrow'},
                towerDefaults
            )),
            new tower.TowerButton(x.util.extend(
                {y: 250, tower: 'Basic'},
                towerDefaults
            ))
        ])
    ]),
    towers
];
return page;
};
