var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/class/SClass", "../../shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../../shared/class/SClass"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    var SSVelteComponent = /** @class */ (function (_super) {
        __extends(SSVelteComponent, _super);
        function SSVelteComponent(settings) {
            var _this = _super.call(this, deepMerge_1.default({
                svelteComponent: {}
            }, settings || {})) || this;
            console.log('Hello');
            return _this;
        }
        return SSVelteComponent;
    }(SClass_1.default));
    exports.default = SSVelteComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9zdmVsdGUvU1N2ZWx0ZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHFFQUFpRDtJQUNqRCw0RUFBd0Q7SUFTeEQ7UUFBK0Isb0NBQVE7UUFDckMsMEJBQVksUUFBaUQ7WUFBN0QsWUFDRSxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLGVBQWUsRUFBRSxFQUFFO2FBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLFNBRUY7WUFEQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUN2QixDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQUFDLEFBWkQsQ0FBK0IsZ0JBQVEsR0FZdEM7SUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9