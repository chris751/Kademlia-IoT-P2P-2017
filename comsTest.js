var express = require('express');
var app = express();

app.get('/:ID/test/:newID',function(){
	res.send('hej');
})
app.listen(9000);
