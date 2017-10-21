const kBucketManager = require('./kBucketManager');
const communication = require('./communication');
const _ = require('lodash');
const main = require('./main');

var k = 8;

var findNode = function(myId, idWeWant, myBucketArray, callback) {
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
  //return resArray;
  return callback(resArray);
}

var idWeWant;
var nodeToCall;

var notLookedAt = [];
var lookedAt = [];
var counter = 0;
var nodeCallback;

var nodeLookup = function(myId, idWeWant, myBucketArray, callback) {
  notLookedAt = [];
  lookedAt = [];
  counter = 0;

  this.idWeWant = idWeWant;
  this.myId = myId;
  nodeCallback = callback;

  findNode(myId, idWeWant, myBucketArray, function(res){
      notLookedAt = res; // when find node is done
  });

  for (i = 0; i < notLookedAt.length; i++) {
    if (idWeWant == notLookedAt[i].remoteId) {
      //console.log('i found it in my own bucket');
      return notLookedAt; //I found the id myself
    }
  }
  searchForId(function(res){
  });
}


var searchForId = function(callback) {
    if(notLookedAt[counter] != undefined){
      communication.findNodeRequest(idWeWant, notLookedAt[counter].remotePort);
      callback(null); //not done yet
    }else {
      console.log('Finished searching on peers');
      var arrayToSort = xorAndSort(lookedAt, idWeWant);
      var xorSortedArray = _.sortBy(arrayToSort, ['xorRes']);
      //console.log('this array should be sorted by xor:' + JSON.stringify(xorSortedArray));
      var kClosetsNodes= xorSortedArray.slice(0, k);
      return callback(kClosetsNodes);
      //main.returnValue(kClosetsNodes);
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
}

var result = [];

var handleResponse = function(response) {
  result = response;
  merge(result);
  lookedAt.push(notLookedAt[counter]);
  counter++;

  searchForId(function(res){
    if (res !== null){
      console.log('we are done');
      nodeCallback(res); // return result if we are done
      //nodeLookup(null, null, null, function (res)){

      }
    })
  }


var xorAndSort = function(array, idWeWant) {
var resArray = [];
  for (i = 0; i < array.length; i++) {

    var id = array[i].remoteId;
    var xorResult = (parseInt(id, 2) ^ parseInt(idWeWant, 2));

    var xorObj =  {
      node: array[i],
      xorRes: xorResult
    };
    resArray.push(xorObj);
  }
  return resArray;
}



module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
