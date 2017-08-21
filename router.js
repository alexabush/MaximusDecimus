const renderer = require('./renderer.js');
const commonHeader = {'Content-Type': 'text/html'};

function home(req, res) {
	res.writeHeader(200, commonHeader);
  	if(req.url == "/") {
        renderer.serveHTML('index', res);
    } else if (req.url === "/public/scripts/index.js") {
    	renderer.serveJS('index', res);
    } else if (req.url === "/public/css/style.css") {
    	res.writeHeader(200, {'Content-Type': 'text/css'});
    	renderer.serveCSS('style', res);
    }	
	res.end();	
}

module.exports.home = home;