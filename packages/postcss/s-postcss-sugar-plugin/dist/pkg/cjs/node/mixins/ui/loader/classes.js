"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name          classes
 * @as              @s.ui.loader.classes
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the loader classes
 *
 * @param       {('spinner'|'round'|'drop'|'square-dots')}                [loaders=['spinner','round','drop','square-dots']]         The loader(s) you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.loader.classes
 *
 * @example     css
 * \@s.ui.loader.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderClassesClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            loaders: {
                description: 'Specify the loaders you want to generate',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['spinner', 'round', 'drop', 'square-dots'],
                default: ['spinner', 'round', 'drop', 'square-dots'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiLoaderClassesClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ loaders: ['spinner', 'round', 'drop', 'square-dots'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Loader
        * @namespace          sugar.style.ui.loader
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/loaders
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply loader styles like "spinner", and more to come...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.ui.loader.classes;
        * 
        * .my-loader {
        *   \@s.ui.loader;
        * }
        * 
        ${finalParams.loaders
        .map((loaderName) => `
            * @cssClass         s-loader:${loaderName}            Display a ${loaderName} loader
        `)
        .join('\n')}
        * 
        ${finalParams.loaders
        .map((loaderName) => `
            * @example        html      ${loaderName} loader
            *   <div class="s-grid:5">
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:accent"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:complementary"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:info"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:error"></div>
            *       </div>
            *   </div>
        `)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    finalParams.loaders.forEach((loaderName) => {
        vars.comment(() => `/**
            * @name           s-loader:${loaderName}
            * @namespace          sugar.style.ui.loader
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${loaderName}</s-color>" loader
            * 
            * @example        html
            * <div class="s-loader:${loaderName}"></div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
            .s-loader-${loaderName} {
                @s.lod.prevent {
                    @s.ui.loader.${(0, string_1.__camelCase)(loaderName)}();
                }
            }
            `, {
            type: 'CssClass',
        });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1REFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0saURBQWtELFNBQVEscUJBQVk7SUFDeEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO2FBQ3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU02RCxzRUFBUztBQUV2RSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUNqRCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosV0FBVyxDQUFDLE9BQU87U0FDaEIsR0FBRyxDQUNBLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzsyQ0FDVyxVQUFVLHlCQUF5QixVQUFVO1NBQy9FLENBQ0k7U0FDQSxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFdBQVcsQ0FBQyxPQUFPO1NBQ2hCLEdBQUcsQ0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7MENBQ1UsVUFBVTs7OytDQUdMLFVBQVU7OzsrQ0FHVixVQUFVOzs7K0NBR1YsVUFBVTs7OytDQUdWLFVBQVU7OzsrQ0FHVixVQUFVOzs7U0FHaEQsQ0FDSTtTQUNBLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsVUFBVTs7Ozs2REFJVSxVQUFVOzs7cUNBR2xDLFVBQVU7Ozs7O1NBS3RDLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7d0JBQ1ksVUFBVTs7bUNBRUMsSUFBQSxvQkFBVyxFQUFDLFVBQVUsQ0FBQzs7O2FBRzdDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFoSEQsNEJBZ0hDIn0=