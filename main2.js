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
// variables
const portArgument = process.argv.slice(2)[0]

// precondition - program will terminate here if no argument is entered
if (portArgument === undefined) {
  console.log('Enter port number as argument');
  return;
}

var newNode = new nodeCreator(portArgument);
var ID = newNode.ID;
var port = newNode.port;
var app = express();
var kbucket = [];
var node_ip_address = `http://localhost:${port}`;
var kbucket_id = 0;
var kbucket_port = 0;

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

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
		console.log(kbucket);

		console.log(kbucket[0].id);
		console.log(kbucket[0].port);

		kbucket_id = kbucket[0].id;
		kbucket_port = kbucket[0].port;
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
    node_ip_address: node_ip_address,
    k_bucket_id: kbucket_id, // fix errors to remove
    k_bucket_port: kbucket_port // fix erros to remove
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
