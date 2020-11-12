"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Function.prototype.logTo = function (console) {
    return (...args) => {
        console.log('start');
        const result = this.apply(this, args);
        console.log('finish');
        return result;
    };
};
//# sourceMappingURL=op.js.map