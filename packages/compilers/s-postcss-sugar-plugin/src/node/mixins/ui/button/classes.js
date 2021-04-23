"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
class postcssSugarPluginUiButtonClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUiButtonClassesInterface;
postcssSugarPluginUiButtonClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    sizes: {
        type: 'String[]',
        alias: 's'
    }
};
function default_1(params = {}, atRule, processNested) {
    const colors = s_sugar_config_1.themeConfig('color'), sizes = s_sugar_config_1.themeConfig('size');
    const finalParams = Object.assign({ colors: Object.keys(colors), sizes: Object.keys(sizes) }, params);
    const vars = [
        `
    @sugar.scope(bare lnf) {
      .s-btn {
        @sugar.ui.button()
      }
    }
  `
    ];
    const styles = s_sugar_config_1.themeConfig('ui.button.styles');
    styles.forEach((style) => {
        vars.push('@sugar.scope(color) {');
        finalParams.colors.forEach((colorName) => {
            const styleCls = style === 'default' ? '' : `.s-btn--${style}`;
            const cls = colorName === 'default'
                ? `.s-btn${styleCls}`
                : `.s-btn.s-btn--${colorName}${styleCls}`;
            vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" button with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
      */`);
            vars.push([
                `${colorName === 'default'
                    ? `.s-btn${styleCls}`
                    : `.s-btn.s-btn--${colorName}${styleCls}`} {`,
                ` @sugar.ui.button($color: ${colorName}, $style: ${style});`,
                `}`
            ].join('\n'));
        });
        vars.push('}');
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyRDtBQUUzRCxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZOztBQWtCZCwrREFBUztBQWpCdkQscURBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFVSixtQkFDRSxTQUE0RCxFQUFFLEVBQzlELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxNQUFNLEdBQUcsNEJBQVcsQ0FBQyxPQUFPLENBQUMsRUFDakMsS0FBSyxHQUFHLDRCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUIsTUFBTSxXQUFXLG1CQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFDdEIsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNyQjs7Ozs7O0dBTUQ7S0FDQSxDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsNEJBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbkMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUM7WUFDL0QsTUFBTSxHQUFHLEdBQ1AsU0FBUyxLQUFLLFNBQVM7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtnQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDWSxHQUFHOzs7OytDQUlnQixLQUFLLHVDQUF1QyxTQUFTOzs7c0JBRzlFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUM1QyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsSUFBSSxDQUNQO2dCQUNFLEdBQ0UsU0FBUyxLQUFLLFNBQVM7b0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtvQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUMzQyxJQUFJO2dCQUNKLDZCQUE2QixTQUFTLGFBQWEsS0FBSyxJQUFJO2dCQUM1RCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOURELDRCQThEQyJ9