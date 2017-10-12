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
var responseList = [];
var nodeToCall;
var closestNode;
var closestNodeXorValue;

var notLookedAt = [];
var lookedAt = [];


var nodeLookup = function(myId, idWeWant, myBucketArray) {
  this.idWeWant = idWeWant;
  this.myId = myId;

  notLookedAt = findNode(myId, idWeWant, myBucketArray);

  for (i = 0; i < notLookedAt.length; i++) {
    if (idWeWant == notLookedAt[i].remoteId) {
      console.log('i found it in my own bucket');
      return notLookedAt; //I found the id myself
    }
  }

  var bucketTocall = kBucketManager.kBucketManager(myId, idWeWant);
  nodeToCall = myBucketArray[bucketTocall][0];
  closestNode = nodeToCall;
  console.log('closestNode is: ');
  console.log(closestNode);
  var xorResult = (parseInt(nodeToCall.remoteId, 2) ^ parseInt(idWeWant, 2));
  //console.log(xorResult);
  closestNodeXorValue = xorResult;

  searchForId();
}

var counter = 0;

var searchForId = function() {
    if(notLookedAt[counter] != undefined){
      communication.findNodeRequest(idWeWant, notLookedAt[counter].remotePort);
    }else {
      console.log('we are done search and we did not find it ');
      return;
    }
};


var merge = function (response) {
  for(i = 0; i < response.length; i++){
    var isPresent = false;
    for(j=0; j < lookedAt.length; j++){
      if(lookedAt[j].remoteId == response[i].remoteId){
          isPresent = true;
      }
    }
    for(c=0; c < notLookedAt.length; c++){
      if(notLookedAt[c].remoteId == response[i].remoteId){
      isPresent = true;
    }
  }
    if(!isPresent){
      notLookedAt.push(response[i]);
    }
  }
  console.log('im done');
  console.log(notLookedAt);
}

var result = [];

var handleResponse = function(response) {
  console.log('response recieved');
  //console.log(response);
  //console.log(typeof(response));
  //notLookedAt.push(response);
  result = response;
  merge(result);
  lookedAt.push(notLookedAt[counter]);
  console.log('we have looked at :' + JSON.stringify(lookedAt));
  counter++;
  searchForId();
   // response.PutIntoList
  // //console.log(notLookedAt);
  //
  // if (counter == k - 1) { // the entire response has been recieved
  //   responseList = _.uniqBy(responseList, 'remoteId'); //removes entries that are not unique
  //   console.log('responseList after sorting');
  //   console.log(responseList);
  //
  //   // response.removeDulicateIds
  //   // response.removeThoseThatWeHaveAsked
  //   // reponse.SortAfterXor
  // }

};



module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
