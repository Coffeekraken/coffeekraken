"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarFeature_1 = __importDefault(require("./SSugarFeature"));
function define(props = {}, name = 's-sugar') {
    SSugarFeature_1.default.define(name, SSugarFeature_1.default, Object.assign({ mountWhen: 'direct' }, props));
}
exports.default = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0VBQThDO0FBRTlDLFNBQXdCLE1BQU0sQ0FDMUIsUUFBc0MsRUFBRSxFQUN4QyxJQUFJLEdBQUcsU0FBUztJQUVoQix1QkFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsdUJBQWUsa0JBQ3hDLFNBQVMsRUFBRSxRQUFRLElBQ2hCLEtBQUssRUFDVixDQUFDO0FBQ1AsQ0FBQztBQVJELHlCQVFDIn0=