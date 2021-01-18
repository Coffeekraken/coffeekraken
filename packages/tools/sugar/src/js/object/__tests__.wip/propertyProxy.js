"use strict";
module.exports = function (__propertyProxy) {
    describe('sugar.js.object.propertyProxy', function () {
        it('Should apply the property proxy correctly and detect the updated', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            __propertyProxy(obj1, 'hello.world', {
                get: function (value) {
                    return 'get ' + value;
                },
                set: function (value) {
                    return 'set ' + value;
                }
            });
            obj1.hello.world = 'lorem ipsum';
            var val = obj1.hello.world;
            expect(val).toBe('get set lorem ipsum');
            done();
        });
    });
};
//# sourceMappingURL=propertyProxy.js.map