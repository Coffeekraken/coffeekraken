"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SViewRenderer_1 = __importDefault(require("../SViewRenderer"));
function page404(data) {
    const engine = new SViewRenderer_1.default('pages.404', {
        view: {
            engine: 'blade'
        }
    });
    const result = engine.render(data);
    return result;
}
exports.default = page404;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUVBQStFO0FBNkIvRSxTQUF3QixPQUFPLENBQzdCLElBQWM7SUFFZCxNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFlLENBQUMsV0FBVyxFQUFFO1FBQzlDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxPQUFPO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBVkQsMEJBVUMifQ==