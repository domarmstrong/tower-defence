var Game = require('../client/x').Game;

var routes = {
    'home': require('./pages/home')
};

var game = new Game();
game.setRoutes(routes);
game.go('home');
