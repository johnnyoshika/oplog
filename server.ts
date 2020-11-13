import http = require('http');
import { Greeter } from './Greeter';
import './oplog';

const port = process.env.port || 1337

async function handler(req, res) {
    const greeter = new Greeter();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(await greeter.greet());
}

http.createServer(
    handler
        .loggable()
        .logTo(console))
    .listen(port);

