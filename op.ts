declare global {
    interface Function {
        logTo(console: Console): any;
    }
}

Function.prototype.logTo = function (console: Console): any {
    return (...args) => {
        console.log('start');
        const result = this.apply(this, args);
        console.log('finish');
        return result;
    }
};

export {};