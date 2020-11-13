import { loggable } from './oplog';

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Greeter implements Greeter {
    @loggable
    async greet() {
        await sleep(100);
        const earth = await this.world();
        return `Hello ${earth}\n`;
    }

    @loggable
    async world() {
        await sleep(100);
        return 'Earth';
    }
}
