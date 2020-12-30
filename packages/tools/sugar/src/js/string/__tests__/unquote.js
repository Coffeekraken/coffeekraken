"use strict";
module.exports = function (__unquote) {
    describe('sugar.js.string.unquote', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__unquote('"Hello world"')).toBe('Hello world');
            expect(__unquote("'Hello world'")).toBe('Hello world');
            expect(__unquote("”Hello world”")).toBe('Hello world');
            expect(__unquote("`Hello world`")).toBe('Hello world');
            done();
        });
    });
};
//# sourceMappingURL=unquote.js.map