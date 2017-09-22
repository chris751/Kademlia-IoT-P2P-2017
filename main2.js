// Npm Modules
var express = require('express'), bodyParser = require('body-parser');
const request = require('request')
const hbs = require('hbs');
const yargs = require('yargs');
const http = require("http");
const _ = require('lodash');
// js files
const nodeCreator = require('./nodeCreator');
const kBucketManager = require('./kBucketManager');
// variables
const portArgument = process.argv.slice(2)[0]

var newNode = new nodeCreator(portArgument);
const ID = newNode.ID;
const port = newNode.port;
console.log('My ID is - ' + ID);

var app = express();
var kbucket_0 = newNode.bucket_0;
var kbucket_1 = newNode.bucket_1;
var kbucket_2 = newNode.bucket_2;
var kbucket_3 = newNode.bucket_3;
var kbucket_4 = newNode.bucket_4;
var kbucket_5 = newNode.bucket_5;
var kbucket_6 = newNode.bucket_6;
var kbucket_7 = newNode.bucket_7;

var my_kbucket;
var my_ip_address = `http://localhost:${port}`;
var kbucket_id;
var kbucket_port;
var kbucket_ip_address;

app.set('view engine', 'hbs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())

// precondition - program will terminate here if no argument is entered
if (portArgument === undefined) {
  console.log('Enter port number as argument');
  return;
}
if(port !== 3500){
request.post(
    'http://localhost:3500/api/node/ping',
    { json: { id: ID, port: port } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
						// console.log('request sent');
						// // // response.remoteId = response.remoteId;
						// // // response.remotePort = response.port;
						// console.log(this.response.body);
						handleResponse(this.response.body);
        }
    }
);
}

function handleResponse(response) {

  var s = new Set();
  s.add(response);

  my_kbucket = Array.from(s);

  var bucketNr = kBucketManager.kBucketManager(ID, my_kbucket[0].remoteId);
  console.log('bucket nr: ' + bucketNr);
  var bucket = [];

  switch (bucketNr) {
    case 0:
      bucket = kbucket_0;
      break;
    case 1:
      bucket = kbucket_1;
      break;
    case 2:
      bucket = kbucket_2;
      break;
    case 3:
      bucket = kbucket_3;
      break;
    case 4:
      bucket = kbucket_4;
      break;
    case 5:
      bucket = kbucket_5;
      break;
    case 6:
      bucket = kbucket_6;
      break;
    case 7:
      bucket = kbucket_7;
      break;
    default:
      console.log('bucket was 8, errors have been made');
  }

  var update_response = kBucketManager.updateBucket(kbucket_0, my_kbucket[0].remoteId);
  console.log('update_response ' + update_response);

  switch (bucketNr) {
    case 0:
      kbucket_0 = update_response;
      break;
    case 1:
      kbucket_1 = update_response;
      break;
    case 2:
      kbucket_2 = update_response;
      break;
    case 3:
      kbucket_3 = update_response;
      break;
    case 4:
      kbucket_4 = update_response;
      break;
    case 5:
      kbucket_5 = update_response;
      break;
    case 6:
      kbucket_6 = update_response;
      break;
    case 7:
      kbucket_7 = update_response;
      break;
    default:
      console.log('error putting in the correct bucket');
  }
  console.log(kbucket_0);
	console.log(kbucket_1);
	console.log(kbucket_2);
	console.log(kbucket_3);
	console.log(kbucket_4);
	console.log(kbucket_5);
	console.log(kbucket_6);
	console.log(kbucket_7);
};

hbs.registerHelper('callMeForBuckets', function callMeForBuckets(bucketNumber){
		if(kbucket_0 !== undefined && bucketNumber == 0){
			return kbucket_0;
		}
		if(kbucket_1 !== undefined && bucketNumber == 1){
			return kbucket_1;
		}
		if(kbucket_2 !== undefined && bucketNumber == 2){
			return kbucket_2;
		}
		if(kbucket_3 !== undefined && bucketNumber == 3){
			return kbucket_3;
		}
		if(kbucket_3 !== undefined && bucketNumber == 3){
			return kbucket_3;
		}
		if(kbucket_4 !== undefined && bucketNumber == 4){
			return kbucket_4;
		}
		if(kbucket_5 !== undefined && bucketNumber == 5){
			return kbucket_5;
		}
		if(kbucket_6 !== undefined && bucketNumber == 6){
			return kbucket_6;
		}
		if(kbucket_7 !== undefined && bucketNumber == 7){
			return kbucket_7;
		}else return '---';
});

// bucket
// ID - på dem man kender
// IP - 127......
// port - Port på dem man kender

// setup homepage
app.get('/', function update(req, res) {
  res.render('home.hbs', {
    node_id: ID,
    node_port_number: port,
    my_ip_address: my_ip_address,
		kbucket_0: kbucket_0,
		kbucket_1: kbucket_1,
		kbucket_2: kbucket_2,
		kbucket_3: kbucket_3,
		kbucket_4: kbucket_4,
		kbucket_5: kbucket_5,
		kbucket_6: kbucket_6,
		kbucket_7: kbucket_7
    // kbucket_ip_address: kbucket_ip_address,
    // k_bucket_id: kbucket_id,
    // k_bucket_port: kbucket_port
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
var response = {
	remoteId,
	remotePort
};
app.post('/api/node/ping', jsonParser, function(req, res) {
		if (!req.body) return res.sendStatus(400);
		// console.log(req.body.id);
		// console.log(req.body.port);
		response.remoteId = req.body.id;
		response.remotePort = req.body.port;
		res.send({'event': 'PONG', 'remoteId': ID, 'port': port});
		handleResponse(response);
})

// start sever
// to 'sudo killall node'
app.listen(port, function() {
  console.log(`Server is up on port ${port}`)
});
