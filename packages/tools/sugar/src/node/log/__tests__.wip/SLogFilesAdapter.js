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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0ZpbGVzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2dGaWxlc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFO0lBRTlDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFFN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDeEIsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxJQUFJLGtCQUFrQixDQUFDO29CQUM1QixJQUFJLEVBQUUsU0FBUyxHQUFHLFFBQVE7aUJBQzNCLENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1FBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7UUFFOUQsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLElBQUksQ0FBQyxFQUFFO1lBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBRS9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFFakUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0IsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLEVBQUUsR0FBRyxFQUFFO29CQUNsQyxJQUFJLEVBQUUsQ0FBQztnQkFDVCxDQUFDLENBQUMsQ0FBQztZQUdMLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9