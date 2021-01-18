"use strict";
module.exports = function (__extractValues) {
    describe('sugar.js.object.extractValues', function () {
        it('Should extract correctly the values from an array ob objects', function (done) {
            var array = [
                {
                    hello: 'world',
                    plop: 'wijwoeijfewf'
                },
                {
                    hello: 'something',
                    plop: 'wijfjjfjfjf'
                },
                {
                    plop: 'something else'
                }
            ];
            expect(__extractValues(array, 'hello')).toEqual(['world', 'something']);
            done();
        });
    });
};
//# sourceMappingURL=extractValues.js.map