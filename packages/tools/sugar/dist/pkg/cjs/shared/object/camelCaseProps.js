"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_js_1 = __importDefault(require("../is/isPlainObject.js"));
const camelCase_js_1 = __importDefault(require("../string/camelCase.js"));
function __camelCaseProps(object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let [key, value] of Object.entries(object)) {
        const newKey = (0, camelCase_js_1.default)(key);
        // treat deep
        if ((0, isPlainObject_js_1.default)(value) && finalSettings.deep) {
            object[newKey] = __camelCaseProps(object[key], finalSettings);
        }
        else {
            object[newKey] = value;
        }
        // delete old key if needed
        if (newKey !== key) {
            delete object[key];
        }
    }
    return object;
}
exports.default = __camelCaseProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXFEO0FBQ3JELDBFQUFpRDtBQWtDakQsU0FBd0IsZ0JBQWdCLENBQ3BDLE1BQVcsRUFDWCxRQUEyQztJQUUzQyxNQUFNLGFBQWEsbUJBQ2YsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBVyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLGFBQWE7UUFDYixJQUFJLElBQUEsMEJBQWUsRUFBQyxLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBMUJELG1DQTBCQyJ9