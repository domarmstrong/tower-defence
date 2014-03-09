var x = require('canvas-x');
var ui = x.ui;
var tower = require('../tower');
var levels = require('../level');

module.exports = function () {
var page = new x.Screen();

var towers = new ui.Bound({
    id: 'towers'
});
var grid = new ui.Grid({
    id: 'grid',
    strokeStyle: '#FFFFFF',
    size: 26
});

var level = new levels.Level({
    grid: grid    
});

var towerButtonDefaults = {
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
            new tower.TowerButton(x.util.extend(
                {y: 150, tower: 'Basic'},
                towerButtonDefaults
            )),
            new tower.TowerButton(x.util.extend(
                {y: 200, tower: 'Arrow'},
                towerButtonDefaults
            )),
            new tower.TowerButton(x.util.extend(
                {y: 250, tower: 'Basic'},
                towerButtonDefaults
            ))
        ])
    ]),
    towers,
    level
];
return page;
};
