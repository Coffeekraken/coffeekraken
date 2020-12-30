"use strict";
module.exports = function (__gravatarUrl) {
    describe('sugar.js.url.gravatarUrl', function () {
        it('Should correctly generate the gravatar url', function () {
            expect(__gravatarUrl('olivier.bossel@gmail.com', 200)).toBe('https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f?s=200');
        });
    });
};
//# sourceMappingURL=gravatarUrl.js.map