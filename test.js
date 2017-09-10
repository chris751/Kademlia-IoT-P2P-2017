var http = require("http");
var createNode = require('./nodeCreator');

var newNode = new createNode(8080);

var ID = 'ID:' + newNode.ID;
var port = '\nport:' + newNode.port;

http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'application/json'});
	res.write(ID);
	res.write(port);
	res.end();
}).listen(newNode.port);
console.log('Server started!');