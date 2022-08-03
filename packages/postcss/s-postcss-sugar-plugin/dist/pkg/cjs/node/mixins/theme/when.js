"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginThemeWhenMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            variant: {
                type: 'String',
            },
            theme: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginThemeWhenMixinInterface;
/**
 * @name           when
 * @namespace      node.mixin.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 * This will mainly scope your css under a class named ```.s-theme:{name}``` but it's
 * nice to use this mixin to make this easier and more modulable
 *
 * @return      {Css}         The generated css
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.theme.when(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div class="s-theme\:dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    let theme = finalParams.theme, variant = finalParams.variant;
    // if (!theme) theme = __STheme.get('theme.theme');
    // if (!variant) variant = __STheme.get('theme.variant');
    let container;
    if (theme && variant) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme^="${theme}"][theme$="${variant}"] &`,
                `&[theme^="${theme}"][theme$="${variant}"]`,
            ],
        });
    }
    else if (theme) {
        container = new postcssApi.Rule({
            selectors: [`[theme^="${theme}"] &`, `&[theme^="${theme}"]`],
        });
    }
    else if (variant) {
        container = new postcssApi.Rule({
            selectors: [`[theme$="${variant}"] &`, `&[theme$="${variant}"]`],
        });
    }
    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUtyRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3FELDhEQUFTO0FBTy9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ3pCLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQ2xDLG1EQUFtRDtJQUNuRCx5REFBeUQ7SUFFekQsSUFBSSxTQUFTLENBQUM7SUFFZCxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7UUFDbEIsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsWUFBWSxLQUFLLGNBQWMsT0FBTyxNQUFNO2dCQUM1QyxhQUFhLEtBQUssY0FBYyxPQUFPLElBQUk7YUFDOUM7U0FDSixDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksS0FBSyxFQUFFO1FBQ2QsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUUsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFLGFBQWEsS0FBSyxJQUFJLENBQUM7U0FDL0QsQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLE9BQU8sRUFBRTtRQUNoQixTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLFlBQVksT0FBTyxNQUFNLEVBQUUsYUFBYSxPQUFPLElBQUksQ0FBQztTQUNuRSxDQUFDLENBQUM7S0FDTjtJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQXpDRCw0QkF5Q0MifQ==