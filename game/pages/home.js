var x = require('../../client/x');
var ui = x.ui;
var tower = require('../tower');

module.exports = function () {
var page = new x.Screen();
page.controls = [
    new ui.Bound({
        background: '#ccc' 
    }, [
        new ui.Bound({
            x: 50, y: 0, h: '100%', w: 750,
            background: '#555'
        }, [
            new ui.Grid({
                id: 'grid',
                strokeStyle: '#FFFFFF',
                size: 26
            }),
            new ui.Bound({
                id: 'towers'
            })
        ]),
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
            new ui.Bound({
                x: 5, y: 160, w: 40, h: 40,
                background: 'green',
                dragStart: function (event) {
                    this.tower = new tower.Basic({
                        x: event.offsetX, y: event.offsetY,
                        w: 20, h: 20,
                        click: function (event) {
                            console.log(this);
                        },
                        dragging: true,
                        background: 'green'
                    });
                    this.tower.screen = this.screen;
                    page.root.children.push(this.tower);
                },
                drag: function (event) {
                    this.tower.set({
                        x: event.offsetX, y: event.offsetY,
                        isTower: true
                    });
                },
                dragStop: function (event) {
                    page.root.children.splice(page.root.children.indexOf(this.tower), 1);
                    var towers = page.getWidget('towers');
                    towers.children.push(this.tower);
                    this.tower.setBound(towers);
                    this.tower.set({
                        x: event.offsetX - towers.x(), y: towers.y(event.offsetY),
                        dragging: false,
                        isTower: true
                    });
                }
            })
        ])
    ])
];
return page;
};
