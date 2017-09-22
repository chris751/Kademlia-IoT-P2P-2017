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

var my_kbucket = [];
var my_ip_address = `http://localhost:${port}`;
var kbucket_id;
var kbucket_port;
var kbucket_ip_address;

//settings

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

if(port != 3500){
request.post(
    'http://localhost:3500/api/node/ping',
    { json: { remoteId: ID, port: port } },
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

// var s = new Set();
function handleResponse(response) {
	var dataClone = _.cloneDeep(response);  //create deep clone
	my_kbucket.push(dataClone);           //push into the array
  // s.add(response);
	//console.log(response);
  // my_kbucket = Array.from(s); //convert set to array
	console.log('handleResponse started by '+ port);
	//console.log(my_kbucket);


  var bucketNr = kBucketManager.kBucketManager(ID, response.remoteId);
  console.log('bucket nr: ' + bucketNr);
  var bucket = [];

	myBucketArray[bucketNr].push(dataClone);
	console.log(myBucketArray);


	bucket = myBucketArray[bucketNr];

  var update_response = kBucketManager.updateBucket(bucket, my_kbucket[0].remoteId);
  console.log('update_response ' + update_response);

	myBucketArray[bucketNr] = update_response;

	for(i=0; i<8; i++){
		console.log(i+' -- '+myBucketArray[i]);

	}
	console.log('i am '+port+' entirety of arrays '+myBucketArray);

};

hbs.registerHelper('callMeForBuckets', function callMeForBuckets(bucketNumber){
	for(i=0; i<8; i++){
		// console.log(myBucketArray[i]);
		if(myBucketArray[i] !== undefined && bucketNumber == i){
			return myBucketArray[i];
		}
	}
});

// setup homepage
app.get('/', function update(req, res) {
  res.render('home.hbs', {
    node_id: ID,
    node_port_number: port,
    my_ip_address: my_ip_address
		// kbucket_0: myBucketArray[0],
		// kbucket_1: myBucketArray[1],
		// kbucket_2: myBucketArray[2],
		// kbucket_3: myBucketArray[3],
		// kbucket_4: myBucketArray[4],
		// kbucket_5: myBucketArray[5],
		// kbucket_6: myBucketArray[6],
		// kbucket_7: myBucketArray[7]
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
		console.log('i have recieved a post request');
		response.remoteId = req.body.remoteId;
		response.remotePort = req.body.port;
		handleResponse(response);
		res.send({'event': 'PONG', 'remoteId': ID, 'port': port});
})

// start sever
// to 'sudo killall node'
app.listen(port, function() {
  console.log(`Server is up on port ${port}`)
});

modules.exports = myBucketArray;