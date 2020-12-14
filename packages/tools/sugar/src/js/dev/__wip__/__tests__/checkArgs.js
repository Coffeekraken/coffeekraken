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
    Object.defineProperty(exports, "__esModule", { value: true });
    module.exports = function (__checkArgs) {
        function checkArgs(param1, param2, param3, param4) {
            // console.log(__getArgsNames(checkArgs));
            if (param3 === void 0) { param3 = 'hello'; }
            __checkArgs(checkArgs, arguments, {
                param1: 'String -v hello,world',
                param2: 'Array,Number',
                param3: 'String',
                param4: '-u'
            });
        }
        describe('sugar.js.dev.checkArgs', function () {
            it('Sould pass the check correctly', function (done) {
                try {
                    checkArgs('yop', 10, 'world');
                }
                catch (e) {
                    console.log(e);
                    done();
                }
            });
        });
    };
});
//# sourceMappingURL=module.js.map