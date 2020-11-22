"use strict";
module.exports = (__uid) => {
    describe('sugar.js.object.uid', () => {
        it('Should encrypt the same object twice the same', done => {
            const obj = {
                param1: 'hello',
                param2: 'world coco'
            };
            const res1 = __uid(obj, 'somethingCool');
            const res2 = __uid(obj, 'somethingCool');
            expect(res1).toBe(res2);
            done();
        });
    });
};
