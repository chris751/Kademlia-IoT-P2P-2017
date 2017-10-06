const kBucketManager = require('./kBucketManager');
const communication = require('./communication');
const _ = require('lodash');


var k = 8;

var findNode = function(myId, idWeWant, myBucketArray) {
  var resArray = [];

  // console.log('findNode called');
  // console.log(myBucketArray);
  var bucket_nr = kBucketManager.kBucketManager(myId, idWeWant);
  // console.log('bucket number is: ' + bucket_nr);

  for (i = 0; i < k; i++) {
    var step = 0;
    step = bucket_nr + i;
    if (step < k) {
      for (j = 0; j < myBucketArray[step].length; j++) {
        var penis = myBucketArray[step][j];
        if (resArray.length < k) {
          resArray.push(penis);
        }
      }
    }
    step = bucket_nr - i;
    if (step !== bucket_nr && step >= 0) {
      for (j = 0; j < myBucketArray[step].length; j++) {
        var bitch = myBucketArray[step][j];
        if (resArray.length < k) {
          resArray.push(bitch);
        }
      }
    }
  }
  // console.log(resArray);
  return resArray;
}

var idWeWant;

var nodeLookup = function(myId, idWeWant, myBucketArray) {
  this.idWeWant = idWeWant;
  this.myId = myId;

  shortList = findNode(myId, idWeWant, myBucketArray);
  for (i = 0; i < shortList.length; i++) {
    if (idWeWant == shortList[i].remoteId) {
      console.log('i found it in my own bucket');
      return shortList; //I found the id myself
    }
  }
  searchForId();
}

var searchForId = function() {
  for (i = 0; i < shortList.length; i++) {
    communication.findNodeRequest(idWeWant, shortList[i].remotePort);
  }
};

var handleResponse = function(response) {
  console.log('response recieved');
  console.log(response);
};

module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
