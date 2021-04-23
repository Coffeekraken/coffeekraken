"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginUtilPilledInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUtilPilledInterface;
postcssSugarPluginUtilPilledInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const vars = ['border-radius: 999999px !important;'];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUtyRCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQU1kLDBEQUFTO0FBTGxELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUNFLFNBQXVELEVBQUUsRUFDekQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFL0QsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFiRCw0QkFhQyJ9