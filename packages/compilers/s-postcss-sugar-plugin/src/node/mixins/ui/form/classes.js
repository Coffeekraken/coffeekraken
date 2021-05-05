"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../../utils/theme"));
class postcssSugarPluginUiFormClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUiFormClassesInterface;
postcssSugarPluginUiFormClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    styles: {
        type: 'String[]',
        alias: 's'
    }
};
function default_1({ params, atRule, processNested }) {
    const colors = theme_1.default().config('ui.form.colors');
    const styles = theme_1.default().config('ui.form.styles');
    const finalParams = Object.assign({ colors,
        styles }, params);
    const vars = [
        `
    @sugar.scope(bare) {
      .s-form-input {
        @sugar.ui.form.input()
      }
    }
  `
    ];
    vars.push('@sugar.scope(lnf) {');
    styles.forEach((style) => {
        const isDefaultStyle = style.match(/:default$/);
        style = style.split(':')[0];
        finalParams.colors.forEach((colorName) => {
            const isDefaultColor = colorName.match(/:default$/);
            colorName = colorName.split(':')[0];
            const styleCls = isDefaultStyle ? '' : `.s-form-input--${style}`;
            const cls = isDefaultColor
                ? `.s-form-input${styleCls}`
                : `.s-form-input.s-form-input--${colorName}${styleCls}`;
            vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.form
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" form input with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <input class="${cls
                .replace(/\./gm, ' ')
                .trim()}" placeholder="Hello world" />
      */`);
            vars.push([
                `${isDefaultColor
                    ? `.s-form-input${styleCls}`
                    : `.s-form-input.s-form-input--${colorName}${styleCls}`} {`,
                ` @sugar.ui.form.input($color: ${colorName}, $style: ${style});`,
                `}`
            ].join('\n'));
        });
    });
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyQztBQUUzQyxNQUFNLHdDQUF5QyxTQUFRLHFCQUFZOztBQWtCZCw2REFBUztBQWpCckQsbURBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFVSixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLE1BQU0sR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxNQUFNLE1BQU0sR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVsRCxNQUFNLFdBQVcsbUJBQ2YsTUFBTTtRQUNOLE1BQU0sSUFDSCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOzs7Ozs7R0FNRDtLQUNBLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN2QyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsS0FBSyxFQUFFLENBQUM7WUFDakUsTUFBTSxHQUFHLEdBQUcsY0FBYztnQkFDeEIsQ0FBQyxDQUFDLGdCQUFnQixRQUFRLEVBQUU7Z0JBQzVCLENBQUMsQ0FBQywrQkFBK0IsU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBRTFELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ1ksR0FBRzs7OzsrQ0FJZ0IsS0FBSywyQ0FBMkMsU0FBUzs7OzBCQUc5RSxHQUFHO2lCQUNsQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsSUFBSSxFQUFFO1NBQ1IsQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FDUDtnQkFDRSxHQUNFLGNBQWM7b0JBQ1osQ0FBQyxDQUFDLGdCQUFnQixRQUFRLEVBQUU7b0JBQzVCLENBQUMsQ0FBQywrQkFBK0IsU0FBUyxHQUFHLFFBQVEsRUFDekQsSUFBSTtnQkFDSixpQ0FBaUMsU0FBUyxhQUFhLEtBQUssSUFBSTtnQkFDaEUsR0FBRzthQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBekVELDRCQXlFQyJ9