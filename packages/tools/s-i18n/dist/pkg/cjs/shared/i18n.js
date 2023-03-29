"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const object_1 = require("@coffeekraken/sugar/object");
function __i18n(str, settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ tokens: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    const i18n = (_a = s_env_1.default.get('i18n')) !== null && _a !== void 0 ? _a : {};
    let translation;
    if (finalSettings.id) {
        translation = (_b = i18n[finalSettings.id]) !== null && _b !== void 0 ? _b : (0, object_1.__get)(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = (_c = i18n[str]) !== null && _c !== void 0 ? _c : str;
    }
    // replace tokens
    for (let [token, value] of Object.entries(finalSettings.tokens)) {
        translation = translation.replace(token, value);
    }
    return translation;
}
exports.default = __i18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLHVEQUFtRDtBQXlCbkQsU0FBd0IsTUFBTSxDQUMxQixHQUFXLEVBQ1gsUUFBaUM7O0lBRWpDLE1BQU0sYUFBYSxtQkFDZixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxNQUFBLGVBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUV0QyxJQUFJLFdBQVcsQ0FBQztJQUNoQixJQUFJLGFBQWEsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsV0FBVyxHQUFHLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsbUNBQUksSUFBQSxjQUFLLEVBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6RTtJQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDZCxXQUFXLEdBQUcsTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLG1DQUFJLEdBQUcsQ0FBQztLQUNsQztJQUVELGlCQUFpQjtJQUNqQixLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQXpCRCx5QkF5QkMifQ==