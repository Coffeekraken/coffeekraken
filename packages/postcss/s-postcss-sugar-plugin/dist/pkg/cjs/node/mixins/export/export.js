"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           export
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your export
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.export(css/general.css) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginCacheInterface extends s_interface_1.default {
    static get _definition() {
        return {
            export: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginCacheInterface;
function default_1({ params, atRule, CssVars, pluginHash, themeHash, exportDir, nodesToString, settings, replaceWith, }) {
    const finalParams = Object.assign({ export: '' }, params);
    if (!finalParams.export || finalParams.export === '') {
        throw new Error(`The "@sugar.export" mixin MUST specify an export path or id...`);
    }
    if (!settings.exports) {
        return nodesToString(atRule.nodes);
    }
    const vars = new CssVars();
    // prepare content to be exportd using the export postprocessor
    console.log(`<yellow>[export]</yellow> Found "<cyan>${finalParams.export}</cyan>" export statement`);
    vars.code(`
    /*! SEXPORT:${finalParams.export} */
    ${nodesToString(atRule.nodes)}
    /*! SENDEXPORT:${finalParams.export} */
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUV0RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNiLFFBQVEsRUFDUixXQUFXLEdBV2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLEVBQUUsSUFDUCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQ1gsZ0VBQWdFLENBQ25FLENBQUM7S0FDTDtJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ25CLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QztJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsK0RBQStEO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQ1AsMENBQTBDLFdBQVcsQ0FBQyxNQUFNLDJCQUEyQixDQUMxRixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQztrQkFDSSxXQUFXLENBQUMsTUFBTTtNQUM5QixhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDWixXQUFXLENBQUMsTUFBTTtLQUNsQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbERELDRCQWtEQyJ9