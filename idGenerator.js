const sha1 = require('sha1');

var newID = function createID(){
	var rN = Math.random();
	var ID = parseInt(sha1(rN).substring(0,9),16);
	console.log('real type' + ID);
	return ID;
}

module.exports = newID;
