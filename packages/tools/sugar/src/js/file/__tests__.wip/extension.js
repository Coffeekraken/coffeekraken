"use strict";
module.exports = function (__extension) {
    describe('sugar.js.file.extension', function () {
        it('Should fine the url extension correctly', function (done) {
            expect(__extension('hello/world/coco.png')).toBe('png');
            done();
        });
    });
};
//# sourceMappingURL=extension.js.map