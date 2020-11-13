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
exports.loggable = void 0;
const { AsyncLocalStorage } = require('async_hooks');
function loggable(target, name, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function')
        descriptor.value = original.loggable();
    return descriptor;
}
exports.loggable = loggable;
function timer() {
    const start = new Date().getTime();
    return {
        get ms() {
            return (new Date().getTime() - start);
        }
    };
}
const storage = new AsyncLocalStorage();
Function.prototype.logTo = function (console) {
    return (...args) => {
        const that = this;
        const log = { indent: 0, lines: [] };
        function write() {
            for (const line of log.lines)
                console.log(line);
        }
        return storage.run(log, () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = that.apply(that, args);
                Promise.resolve(result)
                    .then(() => write())
                    .catch(ex => write());
                return result;
            }
            catch (ex) {
                write();
                throw ex;
            }
        }));
    };
};
Function.prototype.loggable = function (text) {
    const that = this;
    return (...args) => {
        const log = storage.getStore();
        const time = timer();
        log.indent++;
        function insert(ex = undefined) {
            log.lines.splice(0, 0, "    ".repeat(--log.indent) + (text !== null && text !== void 0 ? text : that.name) + ` in ${time.ms} ms. ${ex !== null && ex !== void 0 ? ex : ""}`);
        }
        try {
            const result = that.apply(that, args);
            Promise.resolve(result)
                .then(() => insert())
                .catch(ex => insert(ex));
            return result;
        }
        catch (ex) {
            insert(ex);
            throw ex;
        }
    };
};
//# sourceMappingURL=oplog.js.map