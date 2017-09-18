var xorID = require("./XOR");



//Denne metode returnere et nummer, som er tilsvarende den KBucket, som sortedID skal placeres i.

function kBucketManager(managerId,sortedId){

	this.sortedId = sortedId; // her skal anvendes det ID'et for den node som skal sorteres.
	this.managerId = managerId; //her skal anvendes det ID'et fra den node som bruger metoden

	var xorResult = xorID.xorID(managerId,sortedId);

	//I dette tilfælde burde 8 være K, hvor K er i forbindelse med K bucket
	for(i=0;i<8;i++){
		if (xorResult.charAt(i) == 1){
			return i;
		}
	}
	return 8; //8 kunne i dette tilfælde blivet tolket, som værende et ID'erne er ens
}

function updateBucket(bucket, newNodeId){
	
	this.bucket = bucket;
	this.newNodeId = newNodeId;

	for(i=0; i<bucket.length; i++){
		if(bucket[i] == newNodeId){
			//placer den nye/kendte node i bagerst i arrayet
		}else if(bucket.length >= 7){ //7 skal i dette tilfalde være K,altså antallet af mulige kontaker i en KBucket
			//PING den første node i arrayet, hvis noden svarer, ignorer den nye node
			//hvis den ikke svarer, så smid den ud og tilføj den nye bagerst i arrayet
		}else{
			//Placer nye node bagerst i arrayet	
		}
	}


}