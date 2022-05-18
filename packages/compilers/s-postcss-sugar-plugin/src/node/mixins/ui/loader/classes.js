import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          classes
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the loader classes
 *
 * @param       {('spinner'|'round'|'drop')}                [loaders=['spinner','round','drop']]         The loader(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.loader.classes;
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
                values: ['spinner', 'round', 'drop'],
                default: ['spinner', 'round', 'drop'],
            },
        };
    }
}
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ loaders: ['spinner', 'round', 'drop'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Loaders
        * @namespace          sugar.style.ui
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
            * @namespace          sugar.style.ui.range
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
            .s-loader--${loaderName} {
                @sugar.ui.loader.${loaderName}();
            }
            `);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLGlEQUFrRCxTQUFRLFlBQVk7SUFDeEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQzthQUN4QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsaURBQWlELElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFDbEMsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQkosV0FBVyxDQUFDLE9BQU87U0FDaEIsR0FBRyxDQUNBLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzsyQ0FDVyxVQUFVLHlCQUF5QixVQUFVO1NBQy9FLENBQ0k7U0FDQSxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFdBQVcsQ0FBQyxPQUFPO1NBQ2hCLEdBQUcsQ0FDQSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7MENBQ1UsVUFBVTs7OytDQUdMLFVBQVU7OzsrQ0FHVixVQUFVOzs7K0NBR1YsVUFBVTs7OytDQUdWLFVBQVU7OzsrQ0FHVixVQUFVOzs7U0FHaEQsQ0FDSTtTQUNBLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsVUFBVTs7Ozs2REFJVSxVQUFVOzs7cUNBR2xDLFVBQVU7Ozs7O1NBS3RDLENBQ0EsQ0FBQyxJQUFJLENBQUM7eUJBQ1UsVUFBVTttQ0FDQSxVQUFVOzthQUVoQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==