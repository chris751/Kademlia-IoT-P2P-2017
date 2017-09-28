const kBucketManager = require('./kBucketManager');

var findNode = function (myId, idWeWant) {
	console.log('findNode called');
	console.log(myId, idWeWant);
	var bucket_nr = kBucketManager.kBucketManager(myId, idWeWant);
	console.log('bucket number is' + bucket_nr);
}

module.exports = { 
	findNode
};
