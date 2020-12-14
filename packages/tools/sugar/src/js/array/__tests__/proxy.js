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
    module.exports = function (__proxy) {
        describe('sugar.js.array.proxy', function () {
            it('Should proxy an array correctly', function (done) {
                var baseArray = ['a', 'b', 'c'];
                var myArray = __proxy(baseArray);
                var pushCount = 0;
                var popCount = 0;
                myArray.watch(['push', 'pop'], function (watchObj) {
                    switch (watchObj.action) {
                        case 'push':
                            pushCount++;
                            break;
                        case 'pop':
                            popCount++;
                            break;
                    }
                });
                myArray.push('coco');
                myArray.pop();
                expect(pushCount).toBe(1);
                expect(popCount).toBe(1);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map