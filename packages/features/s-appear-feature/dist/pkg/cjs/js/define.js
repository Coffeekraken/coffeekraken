"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SAppearFeature_1 = __importDefault(require("./SAppearFeature"));
function define(props = {}, name = 's-appear') {
    SAppearFeature_1.default.define(name, SAppearFeature_1.default, Object.assign({ mountWhen: 'entersViewport' }, props));
}
exports.default = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0VBQWdEO0FBRWhELFNBQXdCLE1BQU0sQ0FDMUIsUUFBdUMsRUFBRSxFQUN6QyxJQUFJLEdBQUcsVUFBVTtJQUVqQix3QkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHdCQUFnQixrQkFDMUMsU0FBUyxFQUFFLGdCQUFnQixJQUN4QixLQUFLLEVBQ1YsQ0FBQztBQUNQLENBQUM7QUFSRCx5QkFRQyJ9