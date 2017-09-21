// Npm Modules
const express = require('express');
const request = require('request-promise')
const hbs = require('hbs');
const yargs = require('yargs');
const http = require("http");
const bodyParser = require('body-parser');
const _ = require('lodash');
// js files
const nodeCreator = require('./nodeCreator');
const kBucketManager = require('./kBucketManager');
// variables
const portArgument = process.argv.slice(2)[0]

var newNode = new nodeCreator(portArgument);
var ID = newNode.ID;
var port = newNode.port;

var app = express();
var kbucket_0 = newNode.bucket_0;
var kbucket_1 = newNode.bucket_1;
var kbucket_2 = newNode.bucket_2;
var kbucket_3 = newNode.bucket_3;
var kbucket_4 = newNode.bucket_4;
var kbucket_5 = newNode.bucket_5;
var kbucket_6 = newNode.bucket_6;
var kbucket_7 = newNode.bucket_7;

var kbucket;
var my_ip_address = `http://localhost:${port}`;
var kbucket_id;
var kbucket_port;
var kbucket_ip_address;

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

// precondition - program will terminate here if no argument is entered
if (portArgument === undefined) {
  console.log('Enter port number as argument');
  return;
}

// request
const get3501 = {
  method: 'GET',
  uri: 'http://localhost:3501/api/node/ping', // always ping port 3501
  json: true
}

hbs.registerHelper('ping', function ping() {
  request(get3501)
    .then(function(response) {
      //console.log(response);
      handleResponse(response);
    })
    .catch(function(err) {
      console.log(err);
    })
});

function handleResponse(response) {
  var s = new Set();
  s.add(response);
  kbucket = Array.from(s);
  //update kbucket
  kbucket_id = kbucket[0].id;
  kbucket_port = kbucket[0].port;
  kbucket_ip_address = `http://localhost:${kbucket_port}`;
  console.log('kbucket id ' + kbucket_id);
  //attempt to put in correct bucket
  var bucketNr = kBucketManager.kBucketManager(ID, kbucket_id);
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

  var update_response = kBucketManager.updateBucket(kbucket_0, kbucket_id);
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
    kbucket_ip_address: kbucket_ip_address,
    k_bucket_id: kbucket_id,
    k_bucket_port: kbucket_port
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
// start sever
// to 'sudo killall node'
app.listen(port, function() {
  console.log(`Server is up on port ${port}`)
});
