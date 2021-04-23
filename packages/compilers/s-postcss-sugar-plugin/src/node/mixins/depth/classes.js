"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
class postcssSugarPluginDepthClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginDepthClassesInterface;
postcssSugarPluginDepthClassesInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const depthsObj = s_sugar_config_1.themeConfig('depth');
    const vars = [];
    Object.keys(depthsObj).forEach((depthName) => {
        const depthCss = `/**
  * @name          .s-depth-${depthName}
  * @namespace          sugar.depth
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-depth-${depthName}">I'm a cool depth button</a>
  */
.s-depth-${depthName} {
    @sugar.depth(${depthName});
}`;
        vars.push(depthCss);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyRDtBQUUzRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQU1kLDREQUFTO0FBTHBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUNFLFNBQXlELEVBQUUsRUFDM0QsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyw0QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNDLE1BQU0sUUFBUSxHQUFHOzhCQUNTLFNBQVM7Ozs7Z0RBSVMsU0FBUzs7OzZDQUdaLFNBQVM7O1dBRTNDLFNBQVM7bUJBQ0QsU0FBUztFQUMxQixDQUFDO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBaENELDRCQWdDQyJ9