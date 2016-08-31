var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//general steps:
//configure app
app.set('view engine', 'ejs'); //find ejs files
app.set('views', path.join(__dirname, 'views')); //look inside view folder

//use middleware: needed to parse bodies of requests to the server
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components'))); //send to client whenever requested

//define routes
app.use(require('./todos'));
//start the server
app.listen(1337, function () {
	console.log('ready on port 1337');
}) 

/*

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/