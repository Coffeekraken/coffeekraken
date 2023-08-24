"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
/**
 * @__name           classes
 * @__as              @sugar.platform.classes
 * @__namespace      node.mixin.platform
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin generate all the "platforms" css classes like s-platform:css, etc...
 * "Platforms" are some kind of "icons" of platforms like "css", "node", "js", "php", etc...
 *
 * @__return        {Css}         The generated css
 *
 * @__snippet         @sugar.platform.classes
 *
 * @__example        css
 * \@sugar.platform.classes;
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const files = fs_2.default.readdirSync(`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/img/platforms`);
    const vars = new CssVars();
    files.forEach((filename) => {
        const name = filename.split('.')[0];
        if (finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1)
            return;
        vars.comment(() => `
        
        /**
         * @name            s-platform:${name}
         * @namespace          sugar.style.helpers.platform
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
        .s-platform-${name} {
          @sugar.platform(${name});
        }

  `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsbURBQTREO0FBQzVELDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLCtDQUFnRCxTQUFRLHFCQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGVBQWU7YUFDeEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTJELG9FQUFTO0FBRXJFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLEVBQUUsSUFDVixNQUFNLENBQ1osQ0FBQztJQUVGLGlEQUFpRDtJQUNqRCxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsV0FBVyxDQUMxQixHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxvQkFBb0IsQ0FDdkQsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFDSSxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDNUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLE9BQU87UUFFWCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7eUNBR3VCLElBQUk7Ozs7Ozs7OzttQ0FTVixJQUFJOzs7OztTQUs5QixDQUNBLENBQUMsSUFBSSxDQUNGO3NCQUNVLElBQUk7NEJBQ0UsSUFBSTs7O0dBRzdCLEVBQ1MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEvREQsNEJBK0RDIn0=