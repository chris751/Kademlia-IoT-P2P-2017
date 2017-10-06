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

var kClosetNodes;
var shortList = [];
var newShortList = [];
var askedNodes = [];
var hasBeenAsked = false;
var getResult;
var something;

var counter = 0;
var isEqual = false;
var firstTime = true;

let idWeWant1;
var myId1;
var myBucketArray1;
var shouldCallNextNode = true;

var nodeLookup = function(myId, idWeWant, myBucketArray) {
  idWeWant1 = idWeWant;
  myId1 = myId;
  myBucketArray1 = myBucketArray;

  askedNodes.push(myId);
  shortList = findNode(myId, idWeWant, myBucketArray);
  for (i = 0; i < shortList.length; i++) {
    if (idWeWant == shortList[i].remoteId) {
      console.log('i found it in my own bucket');
      return shortList; //I found the id myself
    }
  }

  var justAnotherList = XorShortList(shortList, idWeWant1);
  putIntoOldShortList(justAnotherList);
  console.log('prints new shortlist and shortlist');
  console.log(newShortList);
  console.log(shortList);
  searchForId();
}

var searchForId = function() {
  for (i = 0; i < shortList.length; i++) {
    communication.findNodeRequest(idWeWant1, shortList[i].remotePort);
    // var askedNodesId = shortList[i].remoteId;
    // askedNodes.push(askedNodesId);
    // console.log('asked port: ' + shortList[i].remotePort);
  }
};

var handleResponse = function(response) {
  console.log('response recieved');
  console.log(response);
  // getResult(response);
  putIntoNewShortList(response);
  compareLists();
};

var compareLists = function() {
  var list = XorShortList(newShortList, idWeWant1);
  putIntoNewShortList(list);
  newShortList = _.slice(newShortList, [start = 0], [end = 8]);

  console.log('newShortList');
  console.log(newShortList);
  console.log('ShortList');
  console.log(shortList);
  shouldContinue(newShortList, shortList);
}

var shouldContinue = function(newShortList, shortList) {
  if (newShortList == shortList) {
    console.log('returned value');
    console.log(newShortList);
    return newShortList;
  } else {
    shortList = newShortList;
    //searchForId(); //run again
    console.log('ids were not simmilar, ill run again');
  }
}

var checkIfHasBeenAsked = function() {
  console.log('inside checkIfHasBeenAsked');
  console.log(askedNodes);

  for (j = 0; j < askedNodes.length; j++) {
    if (askedNodes[j] == shortList[j].remoteId) {
      hasBeenAsked = true;
      console.log(hasBeenAsked = true);
    }
  }
}

var putIntoNewShortList = function(list) {
  for (i = 0; i < list.length; i++) {
    newShortList.push(list[i]);
  }
}

var putIntoOldShortList = function(list) {
  for (i = 0; i < list.length; i++) {
    shortList.push(list[i]);
  }
}

var XorShortList = function(shortList, idWeWant) {
  var list23 = [];
  for (i = 0; i < shortList.length; i++) {
    var id = shortList[i].remoteId;
    var xorResult = (parseInt(id, 2) ^ parseInt(idWeWant, 2));
    // var xorResult = xorResult.toString(2);
    var obj = [{
      shortlist: shortList[i],
      XorRes: xorResult
    }];
    //
    console.log('obj is');
    console.log(obj);

    list23.push(obj);
    console.log('before sort');
    console.log(list23);
    list23 = _.sortBy(list23, ['XorRes']);
    console.log('after sort');
     console.log(list23);
  }
  console.log('xor list');
  console.log(list23);
  return list23;
}



module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
