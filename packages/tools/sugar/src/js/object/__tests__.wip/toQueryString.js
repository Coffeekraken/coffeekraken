"use strict";
module.exports = function (__toQueryString) {
    describe('sugar.js.object.toQueryString', function () {
        it('Should transformt the object into a correctly formatted query string', function (done) {
            var obj = {
                param1: 'hello',
                param2: 'world coco'
            };
            expect(__toQueryString(obj)).toBe('?param1=hello&param2=world%20coco');
            done();
        });
    });
};
//# sourceMappingURL=toQueryString.js.map