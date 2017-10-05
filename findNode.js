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

var nodeLookup = function(myId, idWeWant, myBucketArray) {
  askedNodes.push(myId);
  shortList = findNode(myId, idWeWant, myBucketArray);
  for (i = 0; i < shortList.length; i++) {
    if (idWeWant == shortList[i].remoteId) {
      return shortList; //I found the id myself
    }
  }

  var justAnotherList = XorShortList(shortList, idWeWant);
  putIntoOldShortList(justAnotherList);
  console.log('prints new shortlist and shortlist');
  console.log(newShortList);
  console.log(shortList);



function someName(){
    for (i = 0; i < shortList.length; i++) {
      hasBeenAsked = false;
      checkIfHasBeenAsked();
      if (hasBeenAsked == false) {
        communication.findNodeRequest(idWeWant, shortList[i].remotePort);
        var askedNodesId = shortList[i].remoteId;
        askedNodes.push(askedNodesId);

        console.log('asked port: ' + shortList[i].remotePort);

        getResult = function(res) {
          console.log('hey biatch here is your result with extra cheese');
          console.log(res);
          putIntoNewShortList(res);
        }
      };
    }

    var list = XorShortList(newShortList, idWeWant);
    putIntoNewShortList(list);
    newShortList = _.slice(newShortList, [start = 0], [end = k]);
    console.log('newShortList: ' + newShortList + 'shortList: ' + shortList);
    if (newShortList == shortList) {
      isEqual = true;
    } else {
			someName();
      isEqual = false;
      shortList = newShortList;
    }
};
	if(firstTime){
		someName();
		firstTime = false;
	} // has to call method once to begin
  console.log('returned value');
  console.log(newShortList);
  return newShortList;
}



var checkIfHasBeenAsked = function() {
	console.log('inside checkIfHasBeenAsked');
	console.log(askedNodes);

  for (j = 0; j < askedNodes.length; j++) {
    if (askedNodes[j] == shortList[i].remoteId) {
      hasBeenAsked = true;
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
  var list = [];
  for (i = 0; i < shortList.length; i++) {
    var id = shortList[i].remoteId;
    var xorResult = (parseInt(id, 2) ^ parseInt(idWeWant, 2));
    // var xorResult = xorResult.toString(2);
    var obj = [{
      shortlist: shortList[i],
      XorRes: xorResult
    }];

    console.log('obj is');
    console.log(obj);

    list.push(obj);
    list = _.sortBy(newShortList, ['XorRes']);

  }
  return list;
}

var handleResponse = function(response) {
  console.log('response recieved');
  getResult(response);
};

module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
