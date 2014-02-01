var Screen = require('./screen');
var Mouse = require('./mouse');
var Canvas = require('./canvas');
var ui = require('./ui');

function Game() {
    console.log(Canvas);
    this.canvas = new Canvas();
    this.mouse = new Mouse();
    this.setupMouse();
    this.home();
}

Game.prototype = {
    newGame: function newGame() {
        this.home();
    },
    setupMouse: function setupMouse() {
        this.canvas.canvas.addEventListener('click', this.mouse.click.bind(this.mouse), false);
        this.canvas.canvas.addEventListener('mousemove', this.mouse.move.bind(this.mouse), false);
    },
    home: function home() {
        var self = this;
        this.screen = new Screen([
            new ui.Button({
                x: 20, y: 20, w: 100, h: 50,
                text: 'A button',
                click: function () {
                    self.other();
                }
            })
        ])
        this.mouse.registerScreen(this.screen);
        this.screen.draw(this.canvas);
    },
    other: function other() {
        var self = this;
        this.screen = new Screen([
            new ui.Button({
                x: 20, y: 90, w: 100, h: 50,
                text: 'Other',
                click: function () {
                    self.home();
                }
            })
        ])
        this.mouse.registerScreen(this.screen);
        this.screen.draw(this.canvas);
    }
};
module.exports = Game;
