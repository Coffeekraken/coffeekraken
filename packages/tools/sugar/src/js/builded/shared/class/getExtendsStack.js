// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var class_1 = __importDefault(require("../is/class"));
    var fn = function (cls, settings) {
        if (settings === void 0) { settings = {}; }
        var stack = {};
        if (!class_1.default(cls)) {
            cls = cls.constructor;
        }
        if (settings.includeBaseClass === true) {
            stack[cls.name] = cls;
        }
        var baseClass = cls;
        while (baseClass) {
            var newBaseClass = Object.getPrototypeOf(baseClass);
            if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                stack[newBaseClass.name] = newBaseClass;
                baseClass = newBaseClass;
            }
            else {
                break;
            }
        }
        return stack;
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2NsYXNzL2dldEV4dGVuZHNTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixzREFBb0M7SUF3Q3BDLElBQU0sRUFBRSxHQUFxQixVQUMzQixHQUFRLEVBQ1IsUUFBdUM7UUFBdkMseUJBQUEsRUFBQSxhQUF1QztRQUV2QyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGVBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN2QjtRQUVELElBQUksUUFBUSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN2QjtRQUVELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVwQixPQUFPLFNBQVMsRUFBRTtZQUNoQixJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RELElBQUksWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDaEUsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7Z0JBQ3hDLFNBQVMsR0FBRyxZQUFZLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsTUFBTTthQUNQO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztJQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9