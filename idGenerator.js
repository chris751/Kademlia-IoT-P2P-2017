var crypto = require('crypto');
const sha1 = require('sha1');

var k = 8;


var newID = function (id){
	console.log(id);
	var toBeHashed = ''+id;
	console.log(toBeHashed);

	
  	var shasum = crypto.createHash('sha1');
  	shasum.update(toBeHashed);
  	var hashedVal = shasum.digest('hex');
  	//console.log('hashedVal');
  	//console.log(hashedVal);

  	var ID = hex2bin(hashedVal);
  	ID = ID.substr(0,k);
	//var ID = parseInt('0x'+hashedVal,2);
	console.log(ID);


	//var ID = leftPad(randomIntInc(0, 255).toString(2),8);
	return ID;
}
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}



var leftPad = function (str, length) {
    str = str == null ? '' : String(str);
    length = ~~length;
    pad = '';
    padLength = length - str.length;

    while(padLength--) {
        pad += '0';
    }
    return pad + str;
};


function hex2bin(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(8);
}

module.exports = {
	newID,
	leftPad
};


