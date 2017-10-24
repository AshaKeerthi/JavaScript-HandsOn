var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.json({ extended: false })

app.use(express.static('public'));
app.get('/post.html', function (req, res) {
  // res.sendFile( __dirname + "/" + "post.html" );
  res.end('{"first_name":"Asha","last_name":"Sekar"}');
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
})
