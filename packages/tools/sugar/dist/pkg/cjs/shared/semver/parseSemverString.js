"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("semver/functions/parse"));
function parseSemverString(semverString) {
    const obj = (0, parse_1.default)(semverString);
    return obj;
}
exports.default = parseSemverString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUVBQW9EO0FBaURwRCxTQUF3QixpQkFBaUIsQ0FBQyxZQUFvQjtJQUMxRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGVBQWMsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUN6QyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFIRCxvQ0FHQyJ9