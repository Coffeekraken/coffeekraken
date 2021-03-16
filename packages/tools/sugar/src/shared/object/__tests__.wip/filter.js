"use strict";
module.exports = function (__filter) {
    describe('sugar.js.object.filter', function () {
        it('Should filter the object correctly', function (done) {
            var obj1 = __filter({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            }, function (item, name) {
                return name === 'hello';
            });
            expect(obj1).toEqual({
                hello: {
                    world: 'hello world'
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=filter.js.map