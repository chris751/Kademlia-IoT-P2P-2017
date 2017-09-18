var express =require('express');
var app = express();

console.log('Starting main.js');
// modules
const http = require("http");
// js files
const nodeCreator = require('./nodeCreator');
//find node
// variables
var newNode = new nodeCreator(8080);

//var ID = 'ID:' + newNode.ID;
var ID = 1;

var port = newNode.port;

var bucket = newNode.bucket;

app.get('/',function(req,res){
	//res.send(ID+'    '+port);
	res.sendFile(__dirname+"/"+"index.html");
})
app.listen(8080);

app.get('/api', function(req,res){
	res.send('hello world from port 8080');
})

app.get('/api/node', function(req,res){
	res.send('hello world from port 8080 nodestuff')
})

app.get('/api/node/ping', function(req,res){
	res.send({
		hello: 'this should be JSON'
	}); //send pong
})

app.get('/api/node/info', function(req,res){
	res.send({
		ID,
		port,
		bucket
	})
})

app.get('/api/node/findNode', function(req,res){
	var result = bucket[3]
	res.send({
		result
	})
})

