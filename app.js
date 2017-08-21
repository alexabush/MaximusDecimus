const router = require('./router');
const http = require('http');

http.createServer((req, res) => {
  router.home(req, res);
}).listen(3001);
console.log('Server running on port 3001');

