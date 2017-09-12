var newID = require('./idGenerator');

var newNode = function Node(port){
	this.ID = newID();
	this.port = port;
}

module.exports = newNode;
