"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_js_1 = __importDefault(require("../is/isClass.js"));
const fn = function (cls, settings = {}) {
    const stack = {};
    if (!(0, isClass_js_1.default)(cls)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBNEN6QyxNQUFNLEVBQUUsR0FBcUIsVUFDekIsR0FBUSxFQUNSLFdBQXFDLEVBQUU7SUFFdkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxJQUFBLG9CQUFTLEVBQUMsR0FBRyxDQUFDLEVBQUU7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFFRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7UUFDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDekI7SUFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFFcEIsT0FBTyxTQUFTLEVBQUU7UUFDZCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtZQUM5RCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN4QyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzVCO2FBQU07WUFDSCxNQUFNO1NBQ1Q7S0FDSjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9