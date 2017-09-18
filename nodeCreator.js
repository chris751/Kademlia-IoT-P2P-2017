

const newID = require('./idGenerator');

var newNode = function Node(port){
	this.ID = newID();
	this.port = port;
	//this.bucket = [2,1,5,6,3];
};

module.exports = newNode;
