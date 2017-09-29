const kBucketManager = require('./kBucketManager');
const communication = require('./communication');

var findNode = function(myId, idWeWant, myBucketArray) {
  var resArray = [];
  var k = 8;
  console.log('findNode called');
  console.log(myBucketArray);
  var bucket_nr = kBucketManager.kBucketManager(myId, idWeWant);
  console.log('bucket number is: ' + bucket_nr);

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
  console.log(resArray);
  return resArray;
}

var kClosetNodes;
var shortList = [];

var nodeLookup = function(myId, idWeWant, myBucketArray) {
  shortList = findNode(myId, idWeWant, myBucketArray);
  for (i = 0; i < shortList.length; i++) {
    if (idWeWant == shortList[i].remoteId) {
      return shortList;
    }
  }


  var getResult = (callback) => {
    for (i = 0; i < shortList.length; i++) {
      communication.findNodeRequest(idWeWant, shortList[i].remotePort);

      console.log('asked port' + shortList[i].remotePort);

      setTimeout(() => {
        callback(kClosetNodes);
      }, 50);
    };
  }

  getResult(kClosetNodes => {
    console.log('value returned is' + kClosetNodes);
    return kClosetNodes;
  });
}

var handleResponse = function(response) {
  console.log('method called');
  console.log(response);
  kClosetNodes = response;
};

module.exports =   { 
  findNode,
  nodeLookup,
  handleResponse
};
