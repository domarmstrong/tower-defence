var Mouse = require('./mouse');
var Canvas = require('./canvas');

function Game() {
    this.canvas = new Canvas('canvas');
    this.mouse = new Mouse();
    this.setupMouse();
}
Game.prototype = {
    newGame: function newGame() {
        this.home();
    },
    setupMouse: function setupMouse() {
        this.canvas.on('click', this.mouse.click.bind(this.mouse))
        this.canvas.on('mousemove', this.mouse.move.bind(this.mouse));
    },
    setRoutes: function setRoutes(routes) {
        this.routes = routes;
    },
    go: function go(page) {
        this.screen = this.routes[page]();
        this.mouse.registerScreen(this.screen);
        this.screen.start(this.canvas);
    }
};
module.exports = Game;
