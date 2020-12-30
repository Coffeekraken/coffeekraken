"use strict";
module.exports = function (__uid) {
    describe('sugar.js.object.uid', function () {
        it('Should encrypt the same object twice the same', function (done) {
            var obj = {
                param1: 'hello',
                param2: 'world coco'
            };
            var res1 = __uid(obj, 'somethingCool');
            var res2 = __uid(obj, 'somethingCool');
            expect(res1).toBe(res2);
            done();
        });
    });
};
//# sourceMappingURL=uid.js.map