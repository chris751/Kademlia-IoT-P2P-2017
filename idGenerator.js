//const sha1 = require('sha1');

var newID = function createID(){
	//var rN = Math.random();
	//var ID = parseInt(sha1(rN).substring(0,9),16);
	var ID = leftPad(randomIntInc(0, 255).toString(2),8);
	return ID;
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function leftPad (str, length) {
    str = str == null ? '' : String(str);
    length = ~~length;
    pad = '';
    padLength = length - str.length;

    while(padLength--) {
        pad += '0';
    }

    return pad + str;
}


module.exports = newID;
