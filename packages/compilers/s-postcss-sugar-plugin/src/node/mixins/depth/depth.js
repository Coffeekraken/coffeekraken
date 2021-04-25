"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
class postcssSugarPluginDepthInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginDepthInterface;
postcssSugarPluginDepthInterface.definition = {
    depth: {
        type: 'Number|String',
        required: true,
        alias: 'd'
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ depth: 1 }, params);
    const depthCss = s_sugar_config_1.themeConfig(`depth.${finalParams.depth}`);
    const vars = [`box-shadow: ${depthCss};`];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsaUVBQTBFO0FBRTFFLE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7O0FBY2QscURBQVM7QUFiN0MsMkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBU0osbUJBQ0UsU0FBa0QsRUFBRSxFQUNwRCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsNEJBQVcsQ0FBQyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTNELE1BQU0sSUFBSSxHQUFhLENBQUMsZUFBZSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRXBELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBaEJELDRCQWdCQyJ9