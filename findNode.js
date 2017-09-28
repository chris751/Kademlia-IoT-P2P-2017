const kBucketManager = require('./kBucketManager');

var findNode = function(myId, idWeWant, myBucketArray) {
  var resArray = [];
	var k = 8;

  console.log('findNode called');
  console.log(myBucketArray);
  var bucket_nr = kBucketManager.kBucketManager(myId, idWeWant);
  console.log('bucket number is' + bucket_nr);
  // if (myBucketArray[bucket_nr] !== undefined) {
  //   resArray = myBucketArray[bucket_nr];
  //   console.log(resArray);
  // }

  for (i = 0; i < k; i++) {
    var step = 0;
    step = bucket_nr + i;
		if(step < k ){
    	for (j=0; j < myBucketArray[step].length; j++) {
				// console.log('hej haj');
				// console.log(step);
				// console.log(myBucketArray[step].length);
				// console.log(j);

				var penis = myBucketArray[step][j];
				// console.log(penis);
				if(resArray.length < k){
      	resArray.push(penis);
				}
    	}
		}
    step = bucket_nr - i;
		if (step !== bucket_nr && step >= 0) {
    	for (j=0; j < myBucketArray[step].length; j++) {
				// console.log('bitch');
				// console.log(myBucketArray[step][j]);
      	// resArray.push(myBucketArray[step][j]);
				var bitch = myBucketArray[step][j];
				if(resArray.length < k){
				resArray.push(bitch);
				}
    	}
  	}
	}
	console.log(resArray);
	return resArray;
}

module.exports =   { 
  findNode
};
