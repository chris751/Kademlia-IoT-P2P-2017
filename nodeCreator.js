
const idGenerator = require('./idGenerator');

var newNode = function Node(port){
	var randomNumber = randomIntInc(0, 255);

	this.ID = idGenerator.newID(randomNumber);
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


function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = newNode;
