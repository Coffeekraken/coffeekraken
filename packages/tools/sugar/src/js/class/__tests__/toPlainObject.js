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
    module.exports = function (__toPlainObject) {
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
            return MyClass;
        }());
        var myInstance = new MyClass('coffeekraken');
        myInstance.testing('hello');
        describe('sugar.js.class.toPlainObject', function () {
            it('Should convert a simple custom class instance into a plain object', function () {
                var plainObject = __toPlainObject(myInstance);
                expect(plainObject).toEqual({
                    _settings: {
                        hello: 'world'
                    },
                    _name: 'coffeekraken',
                    _plop: 'hello'
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map