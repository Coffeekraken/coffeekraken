"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../../utils/theme"));
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
    const colors = theme_1.default().config('color'), sizes = theme_1.default().config('size');
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
    const styles = theme_1.default().config('ui.button.styles');
    styles.forEach((style) => {
        vars.push('@sugar.scope(color) {');
        finalParams.colors.forEach((colorName) => {
            const styleCls = style === 'default' ? '' : `.s-btn--${style}`;
            const cls = colorName === 'default'
                ? `.s-btn${styleCls}`
                : `.s-btn.s-btn--${colorName}${styleCls}`;
            vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyQztBQUUzQyxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZOztBQWtCZCwrREFBUztBQWpCdkQscURBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFVSixtQkFDRSxTQUE0RCxFQUFFLEVBQzlELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxNQUFNLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN0QyxLQUFLLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5DLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQ3RCLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7Ozs7OztHQU1EO0tBQ0EsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXBELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbkMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUM7WUFDL0QsTUFBTSxHQUFHLEdBQ1AsU0FBUyxLQUFLLFNBQVM7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtnQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDWSxHQUFHOzs7OytDQUlnQixLQUFLLHVDQUF1QyxTQUFTOzs7c0JBRzlFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUM1QyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsSUFBSSxDQUNQO2dCQUNFLEdBQ0UsU0FBUyxLQUFLLFNBQVM7b0JBQ3JCLENBQUMsQ0FBQyxTQUFTLFFBQVEsRUFBRTtvQkFDckIsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUcsUUFBUSxFQUMzQyxJQUFJO2dCQUNKLDZCQUE2QixTQUFTLGFBQWEsS0FBSyxJQUFJO2dCQUM1RCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOURELDRCQThEQyJ9