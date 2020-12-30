"use strict";
module.exports = function (__object) {
    describe('sugar.js.crypt.object', function () {
        it('Should encrypt then decrypt the string "hello world" correctly', function () {
            var crypted = __object.encrypt({ hello: 'world' });
            var decrypted = __object.decrypt(crypted);
            expect(decrypted).toEqual({ hello: 'world' });
        });
    });
};
//# sourceMappingURL=object.js.map