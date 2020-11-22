"use strict";
module.exports = (__center) => {
    describe('sugar.node.terminal.center', () => {
        it('Should center the passed string correctly', () => {
            process.stdout.columns = 30;
            expect(__center('helloworld')).toBe('          helloworld');
        });
    });
};
