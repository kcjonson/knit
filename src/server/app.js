const startTime = process.hrtime();
console.log('Starting server ...')



import http from 'http';
import prettyHrtime from 'pretty-hrtime';



var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("hello world!\n");
});


server.listen(3000);

const endTime = process.hrtime(startTime)
console.log('Server started in', prettyHrtime(endTime))
