// Npm Modules
var express = require('express'),
  bodyParser = require('body-parser');
const hbs = require('hbs');
const yargs = require('yargs');
const http = require("http");
const _ = require('lodash');


// custom modules
const nodeCreator = require('./nodeCreator');
const kBucketManager = require('./kBucketManager');
const communication = require('./communication');
const findNode = require('./findNode');
const utilities = require('./utilities');
const idGenerator = require('./idGenerator');

// variables
const portArgument = process.argv.slice(2)[0]

var newNode = new nodeCreator(portArgument);
const ID = newNode.ID;
const port = newNode.port;
var my_ip = `http://127.0.0.1:${port}`;
console.log('My ID is - ' + ID);

var storage = [];

var app = express();
var myBucketArray = [
  newNode.bucket_0,
  newNode.bucket_1,
  newNode.bucket_2,
  newNode.bucket_3,
  newNode.bucket_4,
  newNode.bucket_5,
  newNode.bucket_6,
  newNode.bucket_7
];

app.set('view engine', 'hbs');
//needed to allow for cross server communication
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

hbs.registerPartials(__dirname + '/views/partials');

// precondition - program will terminate here if no argument is entered
if (portArgument === undefined) {
  console.log('Enter port number as argument');
  return;
}

function handleResponse(response) {
  var dataClone = _.cloneDeep(response); //create deep clone
  var bucketNr = kBucketManager.kBucketManager(ID, response.remoteId); //XOR ids and return the correct bucketnumber
  var currentBucket = myBucketArray[bucketNr];
  var update_response = kBucketManager.updateBucket(currentBucket, dataClone);
  myBucketArray[bucketNr] = update_response;
};

hbs.registerHelper('list', function(bucketNumber) {
  var out = '';
  for (var i = 0; i < 8; i++) {
    if (myBucketArray[i] !== undefined && bucketNumber == i) {
      for (var j = 0; j < 8; j++) {
        if (myBucketArray[i][j] !== undefined) {
          out = out + "<tr>" + "<td>" + myBucketArray[i][j].remoteId + "</td>" +
            "<td>" + myBucketArray[i][j].remotePort + "</td>" +
            "<td>" + "<a href=" + '"' + myBucketArray[i][j].remoteIp + '"' + ">" + myBucketArray[i][j].remoteIp + "</a>" + "</td>" + "</tr>";
          // sorry, not sorry
          //TODO move all hbs to seperate file
        }
      }
    }
  }
  return out;
});

hbs.registerHelper('listStorage', function() {
  var out = '';
  for (var i = 0; i < 8; i++) { //should be K
    if (storage[i] !== undefined) {
          out = out + "<tr>" + "<td>" + storage[i].key + "</td>" +
            "<td>" + storage[i].value + "</td>" + "</tr>"
          // sorry, not sorry
          //TODO move all hbs to seperate file
    }
  }
  return out;
});

// setup homepage
app.get('/', function update(req, res) {
  res.render('home.hbs', {
    node_id: ID,
    node_port_number: port,
    my_ip_address: my_ip
  });
})

//setup routes
app.get('/api', function(req, res) {
  res.send("api");
})

app.get('/api/node', function(req, res) {
  res.send('node');
})


app.get('/api/node/info', function(req, res) {
  res.send({
    id: ID,
    port: port,
    ip_address: node_ip_address
  })
})

app.get('/api/node/bucket', function(req, res) {
  res.send({
    node_buckets: myBucketArray
  });
})


var jsonParser = bodyParser.json()
var remoteId;
var remotePort;
var remoteIp;
var response = {
  remoteId,
  remotePort,
  remoteIp
};

var res = [];
var nodeLookup;
var res2;

var returnValue = function(res) {
  console.log('called method');
  res2 = res;
}

app.post('/store', function(req, result) {
  var value = req.body.remoteId
  var key = idGenerator.newID(value);

  // console.log(JSON.stringify(keyValuePair));

  var getStoreResult = (callback) => {
    res = findNode.nodeLookup(ID, key, myBucketArray);

    setTimeout(() => {
      callback(res);
    }, 5000);
  };

  getStoreResult((res) => {
    console.log('Peers that we should store in' + JSON.stringify(res));
    // store on list
    for (i = 0; i < res.length; i++) {
      communication.requestStore(key, value, res[i].remotePort);
      // console.log('called' + res[i]);
    }
  });
})

app.post('/storeRequestFromNode', function(req, result) {
  // console.log('request recieved');
  console.log('Storing keyValuePair on ' + port);
  var key = req.body.key;
  var value = req.body.value;
  // console.log(key);
  // console.log(value);

  var keyValuePair = {
    key: key,
    value: value
  };
  //console.log(keyValuePair);
  storage.push(keyValuePair);
  console.log(storage);
})

app.post('/findValue', function(req, result) {
  var keyToFind = req.body.valueToFind;

  var getFindValuePeers = (callback) => {
    res = findNode.nodeLookup(ID, keyToFind, myBucketArray);

    setTimeout(() => {
      callback(res);
    }, 5000);
  };

  getFindValuePeers((res) => {
    console.log('Peers that we should check for stored value ' + JSON.stringify(res));
    for (i = 0; i < res.length; i++) {
      communication.requestSearchForValue(keyToFind, res[i].remotePort); // send Store request to k closest peers
      console.log('called' + JSON.stringify(res[i].remotePort));
    }

  });

  setTimeout(() => {
    console.log('sending tempvar back');
    console.log(tempVar);
    result.send(String(tempVar)); // Express requires response to be a String
  }, 8000);
  //TODO refactor this terrible implementation
})

var tempVar;

var returnValueToClientMission = function(response) {
  console.log('we have the response');
  console.log(response);
  tempVar = response;
}

app.post('/searchForValue', function(req, result) {


  var keyToFind = req.body.keyToFind;
  console.log('about to check if ' + keyToFind + ' has been stored');
  console.log('my storage is ' + storage);

  if (storage != undefined) {
    for (i = 0; i < storage.length; i++) {
      if (keyToFind == storage[i].key) {
        console.log('keys were the same ');
        console.log('returning the value ' + storage[i].value);
        result.send(storage[i].value);
      }else {
        console.log('node did not have the value that we are searching for');
      }
    }
  }
})



app.post('/findnode', function(req, result) {

  var getResult = (callback) => {
    res = findNode.findNode(ID, req.body.remoteId, myBucketArray);

    setTimeout(() => {
      callback(res);
    }, 50);
  };

  var getLookUpResult = (callback) => {
    res2 = findNode.nodeLookup(ID, req.body.remoteId, myBucketArray);

    setTimeout(() => {
      callback(res2);
    }, 3000);
  };


  if (req.body.decision !== undefined) {
    getLookUpResult((res2) => {
      console.log()
      console.log('response to client' + JSON.stringify(res2));
      result.send(res2);
    });
  } else {
    getResult((res) => {
      console.log()
      console.log('response to client' + JSON.stringify(res));
      result.send(res);
    });
  }
})

app.post('/api/node/ping', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  response.remoteId = req.body.remoteId;
  response.remotePort = req.body.remotePort;
  response.remoteIp = req.body.remoteIp;
  handleResponse(response);
  res.send({
    'event': 'PONG',
    'remoteId': ID,
    'remotePort': port,
    'remoteIp': my_ip
  });
})

// start sever
app.listen(port, function() {
  console.log(`Server is up on port ${port}`)
});

communication.sendBootNodePing(ID, port, my_ip); //send ping when a node is created

for (i = 0; i < 7; i++) {
  var randomPort = utilities.getRandomInt(3500, 3528);
  communication.findNodeRandom(ID, port, my_ip, randomPort);
}

module.exports.handleResponse = handleResponse;

module.exports.returnValue = returnValue;

module.exports.returnValueToClientMission = returnValueToClientMission;
// module.exports = {
//   returnValue
// };
