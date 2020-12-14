(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__getMethods) {
        var MyClass = /** @class */ (function () {
            function MyClass(name) {
                this._settings = {
                    hello: 'world'
                };
                this._name = name;
            }
            MyClass.prototype.testing = function (value) {
                this._plop = value;
            };
            MyClass.prototype.plop = function (user) { };
            return MyClass;
        }());
        var myInstance = new MyClass('coffeekraken');
        describe('sugar.js.class.getMethods', function () {
            it('Should return the correct methods list from an instance', function () {
                var res = __getMethods(myInstance);
                expect(res).toEqual(['constructor', 'plop', 'testing']);
            });
        });
    };
});
//# sourceMappingURL=module.js.map