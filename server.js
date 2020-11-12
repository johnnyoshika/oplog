"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
require("./op");
const port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}.logTo(console)).listen(port);
//# sourceMappingURL=server.js.map