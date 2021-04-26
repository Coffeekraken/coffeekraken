"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginDepthClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginDepthClassesInterface;
postcssSugarPluginDepthClassesInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const depthsObj = theme_1.default().config('depth');
    const vars = [];
    Object.keys(depthsObj).forEach((depthName) => {
        const depthCss = `/**
  * @name          .s-depth-${depthName}
  * @namespace          sugar.css.depth
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQU1kLDREQUFTO0FBTHBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUNFLFNBQXlELEVBQUUsRUFDM0QsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxRQUFRLEdBQUc7OEJBQ1MsU0FBUzs7OztnREFJUyxTQUFTOzs7NkNBR1osU0FBUzs7V0FFM0MsU0FBUzttQkFDRCxTQUFTO0VBQzFCLENBQUM7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFoQ0QsNEJBZ0NDIn0=