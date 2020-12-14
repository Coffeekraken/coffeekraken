(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__SLog, __SLogConsoleAdapter) {
        describe('sugar.js.log.SLogConsoleAdapter', function () {
            var logger = new __SLog({
                overrideNativeConsole: false
            });
            var promises = [];
            promises.push(logger.log('Hello world'));
            promises.push(logger.info('Hello world'));
            promises.push(logger.warn('Hello world'));
            promises.push(logger.debug('Hello <green>world</green>'));
            promises.push(logger.error('Hello world <bold>error</bold>'));
            it('Should have resolved the 5 log promises correctly', function (done) {
                Promise.all(promises).then(function (c) {
                    expect(c.length).toBe(5);
                    done();
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map