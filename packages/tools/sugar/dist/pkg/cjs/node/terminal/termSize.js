"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const term_size_1 = __importDefault(require("term-size"));
function termSize() {
    const sizes = (0, term_size_1.default)();
    return Object.assign(Object.assign({}, sizes), { width: sizes.columns, height: sizes.rows });
}
exports.default = termSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW1DO0FBK0JuQyxTQUF3QixRQUFRO0lBQzVCLE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFDO0lBQzNCLHVDQUNPLEtBQUssS0FDUixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDcEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQ3BCO0FBQ04sQ0FBQztBQVBELDJCQU9DIn0=