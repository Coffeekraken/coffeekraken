"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../../is/class"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jbGFzcy91dGlscy9nZXRFeHRlbmRzU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyREFBdUM7QUF3Q3ZDLE1BQU0sRUFBRSxHQUFxQixVQUMzQixHQUFRLEVBQ1IsV0FBcUMsRUFBRTtJQUV2QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFakIsSUFBSSxDQUFDLGVBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN2QjtJQUVELElBQUksUUFBUSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtRQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUN2QjtJQUVELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUVwQixPQUFPLFNBQVMsRUFBRTtRQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtZQUNoRSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN4QyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzFCO2FBQU07WUFDTCxNQUFNO1NBQ1A7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=