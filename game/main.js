var Game = require('canvas-x').Game;
var x = require('canvas-x');
console.log(x);

var routes = {
    'home': require('./pages/home')
};

var game = new Game();
game.setRoutes(routes);
game.go('home');
