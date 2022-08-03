"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../is/class"));
const fn = function (cls, settings = {}) {
    const stack = {};
    if (!(0, class_1.default)(cls)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQW9DO0FBMENwQyxNQUFNLEVBQUUsR0FBcUIsVUFDekIsR0FBUSxFQUNSLFdBQXFDLEVBQUU7SUFFdkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxJQUFBLGVBQVMsRUFBQyxHQUFHLENBQUMsRUFBRTtRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN6QjtJQUVELElBQUksUUFBUSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtRQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUN6QjtJQUVELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUVwQixPQUFPLFNBQVMsRUFBRTtRQUNkLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxZQUFZLElBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQzlELEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ3hDLFNBQVMsR0FBRyxZQUFZLENBQUM7U0FDNUI7YUFBTTtZQUNILE1BQU07U0FDVDtLQUNKO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=