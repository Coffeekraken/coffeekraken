"use strict";
module.exports = function (__unique) {
    describe('sugar.js.array.unique', function () {
        it('Should unique an array correctly', function (done) {
            var baseArray = ['a', 'b', 'c', 'a'];
            var myArray = __unique(baseArray);
            expect(myArray).toEqual(['a', 'b', 'c']);
            var obj = {
                hello: 'world'
            };
            var objBaseArray = ['a', 'b', obj, 'c', obj, obj, obj];
            expect(__unique(objBaseArray)).toEqual(['a', 'b', obj, 'c']);
            done();
        });
    });
};
//# sourceMappingURL=unique.js.map