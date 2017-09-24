//Denne metode returnere et nummer, som er tilsvarende den KBucket, som sortedID skal placeres i.
const idGenerator = require("./idGenerator.js");

var k = 8;

var kBucketManager = function(managerId, sortedId) {
  var xorResult = (parseInt(managerId, 2) ^ parseInt(sortedId, 2));
  var xorResult = xorResult.toString(2);
  xorResult = idGenerator.leftPad(xorResult, k);

  //I dette tilfælde burde 8 være K, hvor K er i forbindelse med K bucket
  var j = k;
  for (i = 0; i < k; i++) {
    j--;
    if (xorResult.charAt(i) == 1) {
      return j;
    }
  }
  return k; //8 kunne i dette tilfælde blivet tolket, som værende et ID'erne er ens
}

//takes the bucket number and the new node
var updateBucket = function(bucket, newNodeObject) {
  var someArray = [];
  someArray.push(newNodeObject);
  console.log('my bucket is');
  console.log(bucket);
  if (bucket !== undefined) {
    for (i = 0; i < bucket.length; i++) {
      if (bucket[i] == newNodeObject.remoteId) {
        //placer den kendte node i bagerst i arrayet
        console.log('inside loop');
        bucket.splice(i, 1);
        bucket.push(newNodeObject);
        return bucket;
        //returner et updateret array
      }
    }
    bucket.push(newNodeObject);
    return bucket;

  }
  return someArray;

  //
  // if(bucket.length >= k-1){ //7 skal i dette tilfalde være K-1,altså antallet af mulige kontaker i en KBucket
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

// var kList//I kListe skal der ligge det array som findes i myBucketArray[distanceBetweenNodes]
// var findNode = function(lookedUpId){
// 	this.lookedUpId = lookedUpId; //lookedUpID er det ID som man leder efter
// 	var askedNodeId; //askedNodeId er ID'et på den adspurgte node
//
// 	var resultArray; //funktionen returnere dette array, som er en liste over de K noder som er tættest på lookedUpId
//
// 	distanceBetweenNodes = kBucketManager(askedNodeId, lookedUpId);
//
// 	kList = main2.myBucketArray[distanceBetweenNodes]; // Hvis myBucketArray[distanceBetweenNodes]  er fuld altså K kontakter
//
//
// 	//8 i if nedenfor skal være k
// 	if(kList.length == k){
// 		return kList;
// 	}else{
//fyld listen op med kontakter til length == 8 eller k



// }
//return den kbucket med samme nummer som 'distanceBetweenNodes'
//Hvis der stadig er plads til flere nodes (altså K antal), da skal der sendes flere med
//medmindre den adspurgte node ikke har flere kontakter
//
// };

/*
if(main2.myBucketArray[distanceBetweenNodes].length == k){
	return main2.myBucketArray[distanceBetweenNodes];
}

var counter = 1;



if(distanceBetweenNodes + counter >= k){
	//lav en while løkke, som bare fylder på fra venstre
	while(distanceBetweenNodes - counter < 0){
		//fyld stuff i array
		counter++;
	}
}
if(distanceBetweenNodes - counter < 0){
	//lav en while løkke, som fylder på fra højre
	while(distanceBetweenNodes + counter >= k){
		//fyld stuff i array
		counter++;
	}
}
*/


//Lav algoritme som kun kigger mod højre
//lav algoritme som kun kiggger mod venstre

//Hav én variable som sammenlignes med index nummeret (den skal være variable + index < k) og omvendt (variable - index >=0)
