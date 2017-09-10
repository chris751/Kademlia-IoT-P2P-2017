var http = require("http");
http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'application/json'});
	res.end('Suck dick');
}).listen(8585);
console.log('Server started!');