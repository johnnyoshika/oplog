const { AsyncLocalStorage } = require('async_hooks');

declare global {
    interface Function {
        logTo(console: Console): any;
        loggable(text?: string): any;
    }
}

function timer() {
    const start = new Date().getTime();
    return {
        get ms(): number {
            return (new Date().getTime() - start);
        }
    }
}

const storage = new AsyncLocalStorage();  

Function.prototype.logTo = function (console: Console): any {
    return (...args) => {
        const that = this;
        const log = { indent: 0, lines: [] };

        function write() {
            for (const line of log.lines)
                console.log(line);
        }

        return storage.run(log, async () => {
            try
            {
                const result = that.apply(that, args);
                Promise.resolve(result)
                    .then(() => write())
                    .catch(ex => write());

                return result;
            }
            catch(ex) {
                write();
                throw ex;
            }
        });
    }
};

Function.prototype.loggable = function (text?: string): any {
    const that = this;
    return (...args) => {
        const log = storage.getStore();
        const time = timer();
        log.indent++;

        function insert(ex = undefined) {
            log.lines.splice(0, 0,
                "    ".repeat(--log.indent) + (text ?? that.name ) + ` in ${time.ms} ms. ${ex ?? ""}`);
        }

        try
        {
            const result = this.apply(this, args);
            Promise.resolve(result)
                .then(() => insert())
                .catch(ex => insert(ex));

            return result;
        }
        catch (ex)
        {
            insert(ex); throw ex;
        }
    }
};

export {};