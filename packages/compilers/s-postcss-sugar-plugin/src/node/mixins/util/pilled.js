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
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = ['border-radius: 999999px !important;'];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQU1kLDBEQUFTO0FBTGxELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUUvRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWpCRCw0QkFpQkMifQ==