"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_1 = __importDefault(require("../is/isCjs"));
const isEsm_1 = __importDefault(require("../is/isEsm"));
function __currentModuleSystem() {
    if ((0, isEsm_1.default)())
        return 'esm';
    if ((0, isCjs_1.default)())
        return 'cjs';
}
exports.default = __currentModuleSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtDO0FBQ2xDLHdEQUFrQztBQXlCbEMsU0FBd0IscUJBQXFCO0lBQ3pDLElBQUksSUFBQSxlQUFPLEdBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QixJQUFJLElBQUEsZUFBTyxHQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7QUFDaEMsQ0FBQztBQUhELHdDQUdDIn0=