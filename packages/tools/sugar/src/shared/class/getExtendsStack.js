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
    const class_1 = __importDefault(require("../is/class"));
    const fn = function (cls, settings = {}) {
        const stack = {};
        if (!class_1.default(cls)) {
            cls = cls.constructor;
        }
        if (settings.includeBaseClass === true) {
            stack[cls.name] = cls;
        }
        let baseClass = cls;
        while (baseClass) {
            const newBaseClass = Object.getPrototypeOf(baseClass);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0RXh0ZW5kc1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0RBQW9DO0lBd0NwQyxNQUFNLEVBQUUsR0FBcUIsVUFDM0IsR0FBUSxFQUNSLFdBQXFDLEVBQUU7UUFFdkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxlQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDdkI7UUFFRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7WUFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDdkI7UUFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFcEIsT0FBTyxTQUFTLEVBQUU7WUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RCxJQUFJLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hFLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO2dCQUN4QyxTQUFTLEdBQUcsWUFBWSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLE1BQU07YUFDUDtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7SUFDRixrQkFBZSxFQUFFLENBQUMifQ==