"use strict";
module.exports = function (__splitEvery) {
    describe('sugar.js.string.splitEvery', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__splitEvery('aaaaaaaaaaaaaaaaaaaaa', 3, true)).toEqual([
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
                'aaa',
            ]);
            done();
        });
    });
};
//# sourceMappingURL=splitEvery.js.map