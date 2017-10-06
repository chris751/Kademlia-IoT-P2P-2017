const kBucketManager = require('./kBucketManager');
const communication = require('./communication');
const _ = require('lodash');

var k = 8;

var findNode = function(myId, idWeWant, myBucketArray) {
  var resArray = [];
  var bucket_nr = kBucketManager.kBucketManager(myId, idWeWant);

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
  return resArray;
}

var idWeWant;
var shortList = [];
var responseList = [];

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

var counter = 0;
var handleResponse = function(response) {

  console.log('response recieved');
  console.log(response);
  responseList.push(response); // response.PutIntoList
  console.log('responselist without sorting');
  console.log(responseList);
  if (counter == k-1 ){ // the entire response has been recieved
  responseList = _.uniqBy(responseList, 'remoteId'); //removes entries that are not unique
  console.log('responseList after sorting');
  console.log(responseList);

  // response.removeDulicateIds
  // response.removeThoseThatWeHaveAsked
  // reponse.SortAfterXor
  }
  counter++;
};



module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
