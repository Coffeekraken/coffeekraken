"use strict";
module.exports = (__extension) => {
    describe('sugar.js.file.extension', () => {
        it('Should fine the url extension correctly', done => {
            expect(__extension('hello/world/coco.png')).toBe('png');
            done();
        });
    });
};
