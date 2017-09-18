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
      console.log('error when sending ping(node is already in bucket)');
    })
});

function handleResponse(response) {
  var duplicateId = kbucket.filter((response) => response.id === id); // put id in variable if it already exsists
  if (duplicateId.length === 0) {
    kbucket.push(response); //put object in our bucket
    console.log('something new in the bucket');
    console.log(kbucket);
  }
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
		node_ip_address: node_ip_address
    //k_bucket_id: kbucket[0].id, // fix errors to remove
    //k_bucket_port: kbucket[0].port // fix erros to remove
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

app.get('/api/node/info', function(req,res){
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
