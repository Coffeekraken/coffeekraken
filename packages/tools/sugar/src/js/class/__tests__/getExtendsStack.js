var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    module.exports = function (__getExtendsStack) {
        var MyClass = /** @class */ (function () {
            function MyClass() {
            }
            return MyClass;
        }());
        var MyOtherClass = /** @class */ (function (_super) {
            __extends(MyOtherClass, _super);
            function MyOtherClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MyOtherClass;
        }(MyClass));
        var FinalClass = /** @class */ (function (_super) {
            __extends(FinalClass, _super);
            function FinalClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return FinalClass;
        }(MyOtherClass));
        describe('sugar.js.class.getExtendsStack', function () {
            it('Should return the correct extends stack', function () {
                expect(__getExtendsStack(FinalClass)).toEqual([
                    'MyOtherClass',
                    'MyClass'
                ]);
            });
            it('Should return the correct extends stack from an instance', function () {
                expect(__getExtendsStack(new FinalClass())).toEqual([
                    'MyOtherClass',
                    'MyClass'
                ]);
            });
        });
    };
});
//# sourceMappingURL=module.js.map