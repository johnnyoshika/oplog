"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
require("./oplog");
const port = process.env.port || 1337;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function greeter() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sleep(2000);
        return 'Hello World\n';
    });
}
http.createServer(function main(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(yield greeter.loggable()());
    });
}.loggable().logTo(console))
    .listen(port);
//# sourceMappingURL=server.js.map