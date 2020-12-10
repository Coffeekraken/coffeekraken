"use strict";
const __rimraf = require('rimraf');
const __fs = require('fs');
module.exports = (__SLog, __SLogFilesAdapter) => {
    describe('sugar.js.log.SLogFilesAdapter', () => {
        const logger = new __SLog({
            adapters: {
                console: null,
                files: new __SLogFilesAdapter({
                    path: __dirname + '/.logs'
                })
            }
        });
        const promises = [];
        promises.push(logger.log('Hello world'));
        promises.push(logger.info('Hello world'));
        promises.push(logger.warn('Hello world'));
        promises.push(logger.debug('Hello <green>world</green>'));
        promises.push(logger.error('Hello world <bold>error</bold>'));
        it('Should have resolved the 5 log promises correctly', done => {
            Promise.all(promises).then((c) => {
                const filesCount = __fs.readdirSync(__dirname + '/.logs').length;
                expect(filesCount).toBe(5);
                __rimraf(__dirname + '/.logs', () => {
                    done();
                });
            });
        });
    });
};
//# sourceMappingURL=module.js.map