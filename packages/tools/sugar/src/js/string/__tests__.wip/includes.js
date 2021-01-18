"use strict";
module.exports = function (__includes) {
    describe('sugar.js.string.includes', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__includes("something wfijweoifjw fwoj foijwef hello ifwjefoiw world wifjweoif", 'something,world,coco')).toEqual([
                'something',
                'world'
            ]);
            done();
        });
    });
};
//# sourceMappingURL=includes.js.map