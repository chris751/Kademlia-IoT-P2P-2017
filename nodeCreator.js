
const idGenerator = require('./idGenerator');

var newNode = function Node(port){
	this.ID = idGenerator.newID();
	this.port = port;
	this.bucket_0 = [];
	this.bucket_1 = [];
	this.bucket_2 = [];
	this.bucket_3 = [];
	this.bucket_4 = [];
	this.bucket_5 = [];
	this.bucket_6 = [];
	this.bucket_7 = [];
};

module.exports = newNode;
