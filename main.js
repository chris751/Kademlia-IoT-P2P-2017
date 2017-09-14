console.log('Starting main.js');
// modules
const http = require("http");
// js files
const nodeCreator = require('./nodeCreator');
// variables
var newNode = new nodeCreator(8080);
var ID = 'ID:' + newNode.ID;
var port = '\nport:' + newNode.port;

http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'application/json'});
	res.write(ID);
	res.write(port);
	res.end();
}).listen(newNode.port);
