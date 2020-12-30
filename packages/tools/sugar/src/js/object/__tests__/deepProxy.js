"use strict";
module.exports = function (__deepProxy) {
    describe('sugar.js.object.deepProxy', function () {
        it('Should detect the updates in the object correctly', function (done) {
            var updatesCount = 0;
            var obj1 = __deepProxy({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            }, function (obj) {
                if (obj.action === 'get')
                    return;
                updatesCount++;
            });
            obj1.hello.world = 'Coco';
            obj1.plop.array.push('coco');
            expect(updatesCount).toBe(2);
            done();
        });
    });
};
//# sourceMappingURL=deepProxy.js.map