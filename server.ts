import http = require('http');
import './op';

const port = process.env.port || 1337

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}.logTo(console)).listen(port);