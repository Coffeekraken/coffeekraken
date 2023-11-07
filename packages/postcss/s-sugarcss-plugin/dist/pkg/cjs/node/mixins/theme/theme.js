"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SSugarcssPluginThemeMixinInterface extends s_interface_1.default {
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
exports.interface = SSugarcssPluginThemeMixinInterface;
/**
 * @name           theme
 * @as          @s.theme
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @return      {Css}         The generated css
 *
 * @snippet         @s.theme($1)
 * @s.theme $1 {
 *      $2
 * }
 *
 * @example        css
 * .my-cool-element {
 *    @s.theme(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div theme="default-dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!atRule.nodes) {
        throw new Error(`<red>[@s.theme]</red> The <yellow>@s.theme(...)</yellow> mixin MUST contain some children...`);
    }
    let theme = finalParams.theme, variant = finalParams.variant;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQzhDLHVEQUFTO0FBT3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCw4RkFBOEYsQ0FDakcsQ0FBQztLQUNMO0lBRUQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFDekIsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFFbEMsSUFBSSxTQUFTLENBQUM7SUFFZCxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7UUFDbEIsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsWUFBWSxLQUFLLGNBQWMsT0FBTyxNQUFNO2dCQUM1QyxhQUFhLEtBQUssY0FBYyxPQUFPLElBQUk7YUFDOUM7U0FDSixDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksS0FBSyxFQUFFO1FBQ2QsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixTQUFTLEVBQUUsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFLGFBQWEsS0FBSyxJQUFJLENBQUM7U0FDL0QsQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLE9BQU8sRUFBRTtRQUNoQixTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLFlBQVksT0FBTyxNQUFNLEVBQUUsYUFBYSxPQUFPLElBQUksQ0FBQztTQUNuRSxDQUFDLENBQUM7S0FDTjtJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQTdDRCw0QkE2Q0MifQ==