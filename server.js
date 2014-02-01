var connect = require('connect');
module.exports = connect().use(connect.static(__dirname)).listen(3000);
console.log('listening on port 3000');
