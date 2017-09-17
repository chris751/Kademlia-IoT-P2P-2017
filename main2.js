// Npm Modules
const express = require('express');
const request = require('request');
const hbs = require('hbs');
const yargs = require('yargs');
const http = require("http");
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
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('home.hbs', {
    node_id: ID,
    port_number: port
  });
})

app.get('/api', function(req, res) {
  res.send('api');
})
app.get('/api/node', function(req, res) {
  res.send('node')
})

app.get('/api/node/ping', function(req, res) {
  res.send({
    hello: 'this should be JSON'
  }); //send pong
})

hbs.registerHelper('ping', function() {
	var port = 3501;
  request(`http://localhost:${port}/api/node/PING`, function(error, response, body) {
    console.log('response: ', response && response.statusCode);
    console.log('body: ', body);
  })
});


app.listen(port, function() {
  console.log(`Server is up on port ${port}`)
});
