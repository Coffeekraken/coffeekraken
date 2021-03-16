"use strict";
module.exports = function (__flatten) {
    describe('sugar.js.object.flatten', function () {
        it('Should flatten the object correctly', function (done) {
            var obj1 = __flatten({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            }, '_', false);
            expect(obj1).toEqual({
                'hello_world': 'hello world',
                'plop_array': [0, 1, 2]
            });
            done();
        });
    });
};
//# sourceMappingURL=flatten.js.map