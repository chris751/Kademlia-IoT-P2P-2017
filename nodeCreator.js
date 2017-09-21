
const idGenerator = require('./idGenerator');

var newNode = function Node(port){
	this.ID = idGenerator.newID();
	this.port = port;
	this.bucket = [2,1,5,6,3];
};

module.exports = newNode;
