var bigInt = require("big-integer");

function xorID(thisNode, neighborNode){
	var result = bigInt(thisNode).xor(neighborNode);
	return result;
}