"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name           classes
 * @namespace      node.mixin.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "platforms" css classes like s-platform:css, etc...
 * "Platforms" are some kind of "icons" of platforms like "css", "node", "js", "php", etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPlatformClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            platforms: {
                type: 'Array<String>',
            },
        };
    }
}
exports.interface = postcssSugarPluginPlatformClassesMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ platforms: [] }, params);
    // list all the available platforms in the folder
    const files = fs_1.default.readdirSync(`${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/img/platforms`);
    const vars = new CssVars();
    files.forEach((filename) => {
        const name = filename.split('.')[0];
        if (finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1)
            return;
        vars.comment(() => `
        
        /**
         * @name            s-platform:${name}
         * @namespace          sugar.style.platform
         * @type            CssClass
         * @platform          css
         * @status          beta
         * 
         * This class allows you to display a plarform "icon" like "js", "node, "php", etc...
         * 
         * @example     html
         * <i class="s-platform\:${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLCtDQUFnRCxTQUFRLHFCQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGVBQWU7YUFDeEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTJELG9FQUFTO0FBRXJFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLEVBQUUsSUFDVixNQUFNLENBQ1osQ0FBQztJQUVGLGlEQUFpRDtJQUNqRCxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsV0FBVyxDQUMxQixHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxvQkFBb0IsQ0FDcEQsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFDSSxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDNUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLE9BQU87UUFFWCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7eUNBR3VCLElBQUk7Ozs7Ozs7OzttQ0FTVixJQUFJOzs7OztTQUs5QixDQUNBLENBQUMsSUFBSSxDQUNGO3VCQUNXLElBQUk7NEJBQ0MsSUFBSTs7O0dBRzdCLEVBQ1MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEvREQsNEJBK0RDIn0=