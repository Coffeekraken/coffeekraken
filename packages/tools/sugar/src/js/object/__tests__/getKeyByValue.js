"use strict";
module.exports = function (__geKeyByValue) {
    describe('sugar.js.object.geKeyByValue', function () {
        it('Should find the correct key passing a value', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            expect(__geKeyByValue(obj1.hello, 'hello world')).toBe('world');
            done();
        });
    });
};
//# sourceMappingURL=getKeyByValue.js.map