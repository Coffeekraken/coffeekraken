"use strict";
module.exports = (__columns) => {
    describe('sugar.node.terminal.columns', () => {
        it('Should generate the columns correctly', () => {
            process.stdout.columns = 30;
            expect(__columns([
                'Hello world',
                'How are you?'
            ])).toBe(`Hello wor      How are y
ld             ou?      `);
        });
    });
};
//# sourceMappingURL=module.js.map