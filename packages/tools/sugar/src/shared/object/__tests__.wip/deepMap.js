"use strict";
module.exports = function (__deepMap) {
    describe('sugar.js.object.deepMap', function () {
        it('Should map the passed objects correctly', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    world: 'Yop'
                }
            };
            var res = __deepMap(obj1, function (value, prop, fullPath) {
                return "~ " + value;
            });
            expect(res).toEqual({
                hello: {
                    world: '~ hello world'
                },
                plop: {
                    world: '~ Yop'
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=deepMap.js.map