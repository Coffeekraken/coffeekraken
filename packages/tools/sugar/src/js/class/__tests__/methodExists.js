"use strict";
module.exports = function (__methodExists) {
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
    myInstance.testing('hello');
    describe('sugar.js.class.methodExists', function () {
        it('Should return true if all the passed methods exists', function () {
            expect(__methodExists(myInstance, 'testing', 'plop')).toBe(true);
        });
        it('Should return an array of missing methods if some passed methods does not exists', function () {
            expect(__methodExists(myInstance, 'testing', 'plop', 'coco')).toEqual([
                'coco'
            ]);
        });
    });
};
//# sourceMappingURL=methodExists.js.map