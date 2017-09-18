var express = require('express');
var app = express.Router();

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

module.exports = app;