"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name            configToCss
 * @namespace       node.mixin.utils
 * @type            PostcssMixin
 * @interface       ./configToCss
 * @platform        css
 * @status          wip
 *
 * This mixin allows you to pass a theme config dot path that point to an object
 * and to print out the result as css properties.
 *
 * @feature         Support rhythmVertical property object
 * @feature         Support camel case properties like borderRadius
 * @feature         Support padding theme value as well as padding unit values
 * @feature         Support margin theme value as well as margin unit values
 * @feature         Support transition theme value as well as normal transition values
 * @feature         Support depth theme value
 * @feature         Support border radius theme value as well as normal border radius values
 * @feature
 *
 * @param           {String}            dotPath             The theme relative dot path to an object to output as css
 * @return          {Css}                                   The generated css
 *
 * @example         css
 * .my-cool-element {
 *      @s.utils.configToCss(ui.code);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUtilsConfigToCssInterface extends s_interface_1.default {
    static get _definition() {
        return {
            dotPath: {
                type: 'String',
                required: true,
            },
            exclude: {
                type: 'Array<String>',
            },
            only: {
                type: 'Array<String>',
            },
        };
    }
}
exports.interface = postcssSugarPluginUtilsConfigToCssInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ dotPath: '', exclude: [], only: [] }, params);
    // @ts-ignore
    const configObj = s_theme_1.default.get(params.dotPath);
    const vars = [
        s_theme_1.default.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEscUJBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTthQUN4QjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRdUQsZ0VBQVM7QUFFakUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsT0FBTyxFQUFFLEVBQUUsRUFDWCxJQUFJLEVBQUUsRUFBRSxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsYUFBYTtJQUNiLE1BQU0sU0FBUyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvQyxNQUFNLElBQUksR0FBYTtRQUNuQixpQkFBUSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRTtZQUN4QyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1NBQ3pCLENBQUM7S0FDTCxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNCRCw0QkEyQkMifQ==