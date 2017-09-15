var express = require('express');
var app = express();
var request = require('request');


console.log('Starting main2.js');
// modules
const http = require("http");
// js files
const nodeCreator = require('./nodeCreator');
// variables
var newNode = new nodeCreator(8081);
var ID = 'ID:' + newNode.ID;
var port = '\nport:' + newNode.port;







app.get('/',function(req,res){
	//res.send(ID+'    '+port);
	res.sendFile(__dirname+"/"+"index.html");
})
app.listen(8081);

app.get('/api', function(req,res){
	res.send('hello world');
})
