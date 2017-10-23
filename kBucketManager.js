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
  // console.log('my bucket is');
  // console.log(bucket);
  if (bucket !== undefined) {
    for (i = 0; i < bucket.length; i++) {
      if (bucket[i].remoteId == newNodeObject.remoteId) {
        //placer den kendte node i bagerst i arrayet
        // console.log('inside loop');
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
}

module.exports = {
  kBucketManager,
  updateBucket
};
