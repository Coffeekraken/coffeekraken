module.exports = (__wait) => {
    describe('sugar.js.time.wait', () => {
        it('Should wait 200ms before resolving the test', async () => {
            await __wait(200);
        });
    });
};
