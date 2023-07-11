"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isCjs_js_1 = __importDefault(require("../is/isCjs.js"));
const isEsm_js_1 = __importDefault(require("../is/isEsm.js"));
function __currentModuleSystem() {
    if ((0, isEsm_js_1.default)())
        return 'esm';
    if ((0, isCjs_js_1.default)())
        return 'cjs';
}
exports.default = __currentModuleSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLDhEQUFxQztBQXlCckMsU0FBd0IscUJBQXFCO0lBQ3pDLElBQUksSUFBQSxrQkFBTyxHQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUIsSUFBSSxJQUFBLGtCQUFPLEdBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztBQUNoQyxDQUFDO0FBSEQsd0NBR0MifQ==