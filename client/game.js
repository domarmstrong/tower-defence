var Mouse = require('./mouse');
var Canvas = require('./canvas');

var routes = {
    'home': require('./pages/home'),
    'other': require('./pages/other')
};

function Game() {
    this.canvas = new Canvas('canvas');
    this.mouse = new Mouse();
    this.setupMouse();
    this.go('home');
}
Game.prototype = {
    newGame: function newGame() {
        this.home();
    },
    setupMouse: function setupMouse() {
        this.canvas.on('click', this.mouse.click.bind(this.mouse))
        this.canvas.on('mousemove', this.mouse.move.bind(this.mouse));
    },
    go: function go(page) {
        this.screen = routes[page](this);
        this.mouse.registerScreen(this.screen);
        this.screen.start(this.canvas);
    }
};
module.exports = Game;
