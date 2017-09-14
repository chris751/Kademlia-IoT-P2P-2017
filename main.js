
console.log('Starting main.js');
// modules
const http = require("http");
// js files
const nodeCreator = require('./nodeCreator');
// variables
var newNode = new nodeCreator(8080);
var ID = newNode.ID;
var port = newNode.port;

http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'text/html'});
	res.write("<h1>Kademilia</h1>");
	res.write("<h3>ID </h3>"+ ID + "<h3>Port </h3>" + port);
	res.end();
}).listen(newNode.port);
