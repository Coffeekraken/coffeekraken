"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEsm_1 = __importDefault(require("./isEsm"));
const isCjs_1 = __importDefault(require("./isCjs"));
function currentModuleSystem() {
    if ((0, isEsm_1.default)())
        return 'esm';
    if ((0, isCjs_1.default)())
        return 'cjs';
}
exports.default = currentModuleSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLG9EQUE4QjtBQXVCOUIsU0FBd0IsbUJBQW1CO0lBQ3ZDLElBQUksSUFBQSxlQUFPLEdBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QixJQUFJLElBQUEsZUFBTyxHQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7QUFDaEMsQ0FBQztBQUhELHNDQUdDIn0=