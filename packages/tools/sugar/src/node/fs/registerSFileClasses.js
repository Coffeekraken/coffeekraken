"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
/**
 * @name            registerSFileClasses
 * @namespace       sugar.node.fs
 * @type            Function
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
exports.default = () => {
    const map = sugar_1.default('fs.sFileClassesMap');
    Object.keys(map).forEach((key) => {
        const cls = require(map[key]).default;
        key
            .split(',')
            .map((l) => l.trim())
            .forEach((pattern) => {
            s_file_1.default.registerClass(pattern, cls);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJTRmlsZUNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RlclNGaWxlQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtFQUEyQztBQUMzQyxzRUFBc0Q7QUFFdEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE1BQU0sR0FBRyxHQUEyQixlQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQy9CLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdEMsR0FBRzthQUNBLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQixnQkFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9