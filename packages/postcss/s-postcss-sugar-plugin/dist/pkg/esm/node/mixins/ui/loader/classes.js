import __SInterface from '@coffeekraken/s-interface';
import { __camelCase } from '@coffeekraken/sugar/string';
/**
 * @name          classes
 * @as              @sugar.ui.loader.classes
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
 * @snippet         @sugar.ui.loader.classes
 *
 * @example     css
 * \@sugar.ui.loader.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
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
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
        * \\@sugar.ui.loader.classes;
        * 
        * .my-loader {
        *   \@sugar.ui.loader;
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
                @sugar.lod.prevent {
                    @sugar.ui.loader.${__camelCase(loaderName)}();
                }
            }
            `, {
            type: 'CssClass',
        });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxpREFBa0QsU0FBUSxZQUFZO0lBQ3hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUM7Z0JBQ25ELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQzthQUN2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsaURBQWlELElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQ2pELE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixXQUFXLENBQUMsT0FBTztTQUNoQixHQUFHLENBQ0EsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDOzJDQUNXLFVBQVUseUJBQXlCLFVBQVU7U0FDL0UsQ0FDSTtTQUNBLElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsV0FBVyxDQUFDLE9BQU87U0FDaEIsR0FBRyxDQUNBLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzswQ0FDVSxVQUFVOzs7K0NBR0wsVUFBVTs7OytDQUdWLFVBQVU7OzsrQ0FHVixVQUFVOzs7K0NBR1YsVUFBVTs7OytDQUdWLFVBQVU7OztTQUdoRCxDQUNJO1NBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lDQUN1QixVQUFVOzs7OzZEQUlVLFVBQVU7OztxQ0FHbEMsVUFBVTs7Ozs7U0FLdEMsQ0FDQSxDQUFDLElBQUksQ0FDRjt3QkFDWSxVQUFVOzt1Q0FFSyxXQUFXLENBQUMsVUFBVSxDQUFDOzs7YUFHakQsRUFDRDtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9