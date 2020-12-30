"use strict";
module.exports = function (__activeSpace) {
    describe('sugar.js.core.activeSpace', function () {
        it('Should set the active space correctly', function () {
            __activeSpace.set('something.cool');
            expect(__activeSpace.get()).toBe('something.cool');
        });
        it('Should set the active space then check some passed active spaces correctly', function () {
            __activeSpace.set('something.cool.hello.world');
            expect(__activeSpace.is('something')).toBe(false);
            expect(__activeSpace.is('something.*')).toBe(true);
            expect(__activeSpace.is('*.cool.**')).toBe(true);
        });
    });
};
//# sourceMappingURL=activeSpace.js.map