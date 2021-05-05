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
function default_1({ params, atRule, processNested }) {
    const colors = theme_1.default().config('color'), sizes = theme_1.default().config('size');
    const finalParams = Object.assign({ colors: Object.keys(colors), sizes: Object.keys(sizes) }, params);
    const vars = [
        `
    @sugar.scope(bare) {
      .s-btn {
        @sugar.ui.button()
      }
    }
  `
    ];
    const styles = theme_1.default().config('ui.button.styles');
    vars.push('@sugar.scope(lnf) {');
    styles.forEach((style) => {
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
    });
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyQztBQUUzQyxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZOztBQWtCZCwrREFBUztBQWpCdkQscURBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFVSixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLE1BQU0sR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3RDLEtBQUssR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbkMsTUFBTSxXQUFXLG1CQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFDdEIsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNyQjs7Ozs7O0dBTUQ7S0FDQSxDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQztZQUMvRCxNQUFNLEdBQUcsR0FDUCxTQUFTLEtBQUssU0FBUztnQkFDckIsQ0FBQyxDQUFDLFNBQVMsUUFBUSxFQUFFO2dCQUNyQixDQUFDLENBQUMsaUJBQWlCLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5QyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNZLEdBQUc7Ozs7K0NBSWdCLEtBQUssdUNBQXVDLFNBQVM7OztzQkFHOUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO1NBQzVDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQ1A7Z0JBQ0UsR0FDRSxTQUFTLEtBQUssU0FBUztvQkFDckIsQ0FBQyxDQUFDLFNBQVMsUUFBUSxFQUFFO29CQUNyQixDQUFDLENBQUMsaUJBQWlCLFNBQVMsR0FBRyxRQUFRLEVBQzNDLElBQUk7Z0JBQ0osNkJBQTZCLFNBQVMsYUFBYSxLQUFLLElBQUk7Z0JBQzVELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQXBFRCw0QkFvRUMifQ==