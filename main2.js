var express = require('express');
var app = express();
const request = require('request');
const hbs = require('hbs');

// modules
const http = require("http");
// js files
const nodeCreator = require('./nodeCreator');
// variables
var newNode = new nodeCreator(8081);
var ID = newNode.ID;
var port = newNode.port;

app.set('view engine', 'hbs');

app.get('/',function(req,res){
	//res.send(ID+'    '+port);
	res.render('home.hbs', {
		node_id: ID,
		port_number: port
	});
})


app.get('/api', function(req,res){
	res.send('hello world');
})

var pingPong = function ping () {
	  request('http://localhost:8080/api/node/PING', function (error, response, body){
		console.log('error: ', error);
		console.log('response: ', response && response.statusCode);
		console.log('body: ', body);
		}
	)
};
pingPong();

app.listen(8081, function(){
	console.log('Server is up on port 8081')
});
