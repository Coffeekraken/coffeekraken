"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
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
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ depth: 1 }, params);
    // console.log(atRule.toString());
    const depthCss = theme_1.default().config(`depth.${finalParams.depth}`);
    const vars = [`box-shadow: ${depthCss};`];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7O0FBY2QscURBQVM7QUFiN0MsMkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBU0osbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFDRixrQ0FBa0M7SUFFbEMsTUFBTSxRQUFRLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFaEUsTUFBTSxJQUFJLEdBQWEsQ0FBQyxlQUFlLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFcEQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFyQkQsNEJBcUJDIn0=