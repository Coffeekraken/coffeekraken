"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0RXh0ZW5kc1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHdEQUFvQztBQXdDcEMsTUFBTSxFQUFFLEdBQXFCLFVBQzNCLEdBQVEsRUFDUixXQUFxQyxFQUFFO0lBRXZDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVqQixJQUFJLENBQUMsZUFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBRXBCLE9BQU8sU0FBUyxFQUFFO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxZQUFZLElBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQ2hFLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ3hDLFNBQVMsR0FBRyxZQUFZLENBQUM7U0FDMUI7YUFBTTtZQUNMLE1BQU07U0FDUDtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==