import http = require('http');
import './oplog';

const port = process.env.port || 1337

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function greeter() {
    await sleep(2000); 
    return 'Hello World\n';
}

http.createServer(async function main(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(await greeter.loggable()());
}.loggable().logTo(console))
.listen(port);

