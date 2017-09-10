//Import modules
var http = require("http");
var sha1 = require('sha1');

//Real code

//var ID = parseInt(sha1('message').substring(0,9),16); //Tager 10 første tal i SHA1 Hash og parser det til en int

//var ID = createID();

//var realID = 'ID:' + createID();
//var port = 8080
//var portWrite = 'port:' + port;


var node = nodeGenerator(8080);

var ID = 'ID:' + node.ID;
var port = 'port:' + node.port;

http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'application/json'});
	res.write(ID);
	res.write(port);
	res.end();
}).listen(node.port);
console.log('Server started!');



function nodeGenerator(port){
	var ID = createID();
	return {
		ID: ID,
		port: port

	};
}



//Laver et ID

function createID(){
	var rN = Math.random();

	var ID = parseInt(sha1(rN).substring(0,9),16);

	return ID;
}
