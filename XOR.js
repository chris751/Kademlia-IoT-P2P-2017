var bigInt = require("big-integer");

var xorID = function xorID(thisNode, neighborNode){
	var result = bigInt(thisNode).xor(neighborNode);
	return result;
}

module.exports = xorID;

// testing GIT 
