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
// variables
const portArgument = process.argv.slice(2)[0]

var newNode = new nodeCreator(portArgument);
const ID = newNode.ID;
const port = newNode.port;
var my_ip = `http://127.0.0.1:${port}`;
console.log('My ID is - ' + ID);

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

communication.sendping(ID, port, my_ip); //send ping when a node is created

function handleResponse(response) {
  var dataClone = _.cloneDeep(response); //create deep clone
  var bucketNr = kBucketManager.kBucketManager(ID, response.remoteId); //XOR ids and return the correct bucketnumber
  var currentBucket = myBucketArray[bucketNr];
  var update_response = kBucketManager.updateBucket(currentBucket, dataClone);
  myBucketArray[bucketNr] = update_response;
  for (i = 0; i < 8; i++) {
    console.log(i);
    console.log(myBucketArray[i]);
  }
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
        }
      }
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
  res.send('api');
})

app.get('/api/node', function(req, res) {
  res.send('node')
})

app.get('/api/node/ping', function(req, res) {
  res.send({
    id: ID,
    port: port
  });
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
    node: kbucket
  });
})

app.get('/api/node/:id', function(req, res) {
  res.send({
    id: ID
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

app.post('/api/node/ping', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  response.remoteId = req.body.remoteId;
  response.remotePort = req.body.remotePort;
  response.remoteIp = req.body.remoteIp;
  console.log(req.body);
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

module.exports.handleResponse = handleResponse;
