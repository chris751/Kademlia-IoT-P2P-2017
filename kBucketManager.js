//Denne metode returnere et nummer, som er tilsvarende den KBucket, som sortedID skal placeres i.
const idGenerator = require("./idGenerator.js");

var kBucketManager = function kBucketManager(managerId,sortedId){
	this.sortedId = sortedId; // her skal anvendes det ID'et for den node som skal sorteres.
	this.managerId = managerId; //her skal anvendes det ID'et fra den node som bruger metoden

	console.log('Preparing to XOR my ID('+ managerId+')' + ' with other ID - ('+ sortedId+')');
	var xorResult = (parseInt(managerId, 2) ^ parseInt(sortedId, 2));
	// console.log(xorResult);
	var xorResult= xorResult.toString(2);
	// console.log(xorResult);
	// console.log(typeof(xorResult));
	xorResult = idGenerator.leftPad(xorResult, 8);
	console.log('XOR result = ' + xorResult);

	//I dette tilfælde burde 8 være K, hvor K er i forbindelse med K bucket
	var j = 8;
	for(i=0;i<8;i++){
		 j--;
		if (xorResult.charAt(i) == 1){
			// console.log('loop startet');
			// console.log('looped' + i +'times');
			return j;
		}
	}
	return 8; //8 kunne i dette tilfælde blivet tolket, som værende et ID'erne er ens
}

//takes the bucket number and the new node
var updateBucket = function updateBucket(bucket, newNodeId){
	var s = new Set();
  s.add(newNodeId);
  bucket = Array.from(s);
	return bucket;

	// for(i=0; i<bucket.length; i++){
	// 	if(bucket[i] == newNodeId){
	// 		//placer den kendte node i bagerst i arrayet
	//
	// 		//returner et updateret array
	// 	}
	// }
	//
	// if(bucket.length >= 7){ //7 skal i dette tilfalde være K,altså antallet af mulige kontaker i en KBucket
	// 	//PING den første node i arrayet, hvis noden svarer, ignorer den nye node
	// 	//hvis den ikke svarer, så smid den ud og tilføj den nye bagerst i arrayet
	//
	// 	//returner et updateret array
	// }else{
	// 	//Placer nye node bagerst i arrayet
	//
	// 	//returner et updateret array
	// }
}

module.exports = {
	kBucketManager,
	updateBucket
};
