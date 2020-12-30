"use strict";
module.exports = function (__ensureExists) {
    describe('sugar.js.object.ensureExists', function () {
        it('Should have created the passed dotted path inside the object', function (done) {
            var obj1 = {
                hello: 'world'
            };
            __ensureExists(obj1, 'coco.yop', {});
            expect(obj1).toEqual({
                hello: 'world',
                coco: {
                    yop: {}
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=ensureExists.js.map