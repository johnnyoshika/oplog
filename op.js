"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { AsyncLocalStorage } = require('async_hooks');
const storage = new AsyncLocalStorage();
Function.prototype.logTo = function (console) {
    return (...args) => {
        const that = this;
        const log = { indent: 0, lines: [] };
        return storage.run(log, () => {
            that.apply(that, args);
            for (const line of log.lines)
                console.log(line);
        });
    };
};
Function.prototype.log = function (text) {
    return (...args) => {
        const log = storage.getStore();
        log.lines.push("    ".repeat(log.indent) + text);
        log.indent++;
        try {
            var result = this.apply(this, args);
        }
        finally {
            --log.indent;
        }
        return result;
    };
};
//# sourceMappingURL=op.js.map