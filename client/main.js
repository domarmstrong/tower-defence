var Game = require('./game');

var routes = {
    'home': require('./pages/home'),
    'other': require('./pages/other')
};

var game = new Game();
game.setRoutes(routes);
game.go('home');
