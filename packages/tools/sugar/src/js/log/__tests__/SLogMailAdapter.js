// TODO check the smtp connection...
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
    module.exports = function (__SLog, __SLogMailAdapter) {
        describe('sugar.js.log.SLogMailAdapter', function () {
            var logger = new __SLog({
                adapters: {
                    mail: new __SLogMailAdapter({
                        // host: 'smtp.gmail.com',
                        // username: 'olivier.bossel@gmail.com',
                        // password: '',
                        secureToken: '2bafe154-7234-448b-8501-3da40dbf77cc',
                        to: 'olivier.bossel@gmail.com',
                        from: 'info@coffeekraken.io'
                    })
                }
            });
            logger.log('Hello world');
            it('Should send the mail correctly', function (done) {
                // setTimeout(() => {
                //   done();
                // }, 3000);
            });
        });
    };
});
//# sourceMappingURL=module.js.map