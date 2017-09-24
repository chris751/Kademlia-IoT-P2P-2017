var xorID = require("./XOR");

function findNode(askedNode, findId){
	this.askedNode = askedNode;
	this.findId = findId;
	this.bucket = askedNode.bucket;

	var closest;
	var xorValue;
	var closestNode;

	for(i = 0; i < bucket.length; i++){
		if(bucket[i] === findId){
			return [askedNode.ID, askedNode.port];
		}
		else{
			var xorValue = xorID.xorID(askedNode, findId);
			if(closest === null){
				closest = xorValue;
				closestNode = askedNode.bucket[i];
			}
			if (xorValue < closest){
				closest = xorValue;
				closestNode = askedNode.bucket[i];
			}
		}
	}
	return findNode(closestNode, findId);
}

module.exports = findNode;
