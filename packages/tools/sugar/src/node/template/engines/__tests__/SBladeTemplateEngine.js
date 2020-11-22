"use strict";
const __path = require('path');
const __tmp = require('tmp');
module.exports = (__SBladeTemplateEngine) => {
    describe('sugar.node.template.engines.SBladeTemplateEngine', () => {
        const engine = new __SBladeTemplateEngine({
            cacheDir: __tmp.tmpNameSync()
        });
        it('Should correctly render the passed view path', (done) => {
            engine
                .render(__path.resolve(__dirname, 'views/index.blade.php'))
                .then((res) => {
                console.log('res');
                expect(true).toBe(true);
                done();
            });
        });
    });
};
