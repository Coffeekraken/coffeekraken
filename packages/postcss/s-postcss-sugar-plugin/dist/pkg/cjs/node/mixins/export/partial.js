"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           partial
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your partial
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.partial(general) {
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
            id: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginCacheInterface;
function default_1({ params, atRule, CssVars, nodesToString, settings, }) {
    const finalParams = Object.assign({ id: '' }, params);
    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@sugar.export" mixin MUST specify an export path or id...`);
    }
    if (!settings.partials) {
        return nodesToString(atRule.nodes);
    }
    const vars = new CssVars();
    // prepare content to be exportd using the export postprocessor
    console.log(`<yellow>[partial]</yellow> Found "<cyan>${finalParams.id}</cyan>" partial statement`);
    vars.code(`
    /*! SPARTIAL:${finalParams.id} */
    ${nodesToString(atRule.nodes)}
    /*! SENDPARTIAL:${finalParams.id} */
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUV0RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsYUFBYSxFQUNiLFFBQVEsR0FPWDtJQUNHLE1BQU0sV0FBVyxtQkFDYixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRUFBZ0UsQ0FDbkUsQ0FBQztLQUNMO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDcEIsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQiwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCwyQ0FBMkMsV0FBVyxDQUFDLEVBQUUsNEJBQTRCLENBQ3hGLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDO21CQUNLLFdBQVcsQ0FBQyxFQUFFO01BQzNCLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3NCQUNYLFdBQVcsQ0FBQyxFQUFFO0tBQy9CLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExQ0QsNEJBMENDIn0=