//Denne metode returnere et nummer, som er tilsvarende den KBucket, som sortedID skal placeres i.
const idGenerator = require("./idGenerator.js");

var kBucketManager = function kBucketManager(managerId,sortedId){
	this.sortedId = sortedId; // her skal anvendes det ID'et for den node som skal sorteres.
	this.managerId = managerId; //her skal anvendes det ID'et fra den node som bruger metoden

	console.log('id1 - '+ managerId + ' id2 - '+ sortedId);
	var xorResult = (parseInt(managerId, 2) ^ parseInt(sortedId, 2));
	console.log(xorResult);
	var xorResult= xorResult.toString(2);
	console.log(xorResult);
	console.log(typeof(xorResult));
	xorResult = idGenerator.leftPad(xorResult, 8);
	console.log('left pad ' + xorResult);


	//console.log('xor res: ' + xorResult);


	// console.log('xor res: ' + xorResult);
	// var xorResult= xorResult.toString(2);
	// var xorResult = parseInt(xorResult);
	// console.log('xor res: ' + xorResult);

	//I dette tilfælde burde 8 være K, hvor K er i forbindelse med K bucket
	for(i=0;i<8;i++){
		if (xorResult.charAt(i) == 1){
			console.log('loop startet');
			console.log('looped' + i +'times');
			return i;
		}
	}
	return 8; //8 kunne i dette tilfælde blivet tolket, som værende et ID'erne er ens
}

var updateBucket = function updateBucket(bucket, newNodeId){

	this.bucket = bucket;
	this.newNodeId = newNodeId;

	for(i=0; i<bucket.length; i++){
		if(bucket[i] == newNodeId){
			//placer den nye/kendte node i bagerst i arrayet

			//returner et updateret array
		}else if(bucket.length >= 7){ //7 skal i dette tilfalde være K,altså antallet af mulige kontaker i en KBucket
			//PING den første node i arrayet, hvis noden svarer, ignorer den nye node
			//hvis den ikke svarer, så smid den ud og tilføj den nye bagerst i arrayet

			//returner et updateret array
		}else{
			//Placer nye node bagerst i arrayet

			//returner et updateret array
		}
	}


}

module.exports = {
	kBucketManager,
	updateBucket
};
