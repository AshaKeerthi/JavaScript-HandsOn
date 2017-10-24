var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('checkoutput.json', function(err, data){
      res.write(data);
      res.end();
    });
}).listen(8080);
