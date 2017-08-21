const fs = require('fs');

function serveHTML(fileName, res) {
	const fileHTML = fs.readFileSync('./views/' + fileName + '.html', {encoding: 'utf8'});
	res.write(fileHTML);
}

function serveJS(fileName, res) {
	const fileJS = fs.readFileSync('./public/scripts/' + fileName + '.js', {encoding: 'utf8'});
	res.write(fileJS);
}

function serveCSS(fileName, res) {
	const fileCSS = fs.readFileSync('./public/css/' + fileName + '.css', {encoding: 'utf8'});
	res.write(fileCSS);
}

module.exports.serveHTML = serveHTML;
module.exports.serveJS = serveJS;
module.exports.serveCSS = serveCSS;
