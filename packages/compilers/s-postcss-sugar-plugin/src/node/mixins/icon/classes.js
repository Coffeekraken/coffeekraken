import __SInterface from '@coffeekraken/s-interface';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
/**
 * @name           classes
 * @namespace      node.mixins.icon
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the classes needed to display the icons you've
 * passed as parameter.
 * The icons parameter define all the icons you want. Each line define a new icon and you can use these
 * different "adapters" to specify your icons:
 *
 * - Line syntax: {adapter}:{name}:{nameYouWant}
 *
 * Available adapters are:
 *
 * - Filesystem:
 * Here's some example of filesystem icons declarations:
 * @sugar.icon.classes(
 *    fs:src/icons/vuejs.svg:vue
 *    fs:src/icons/something.svg:something
 * );
 *
 * - Font awesome (5)
 * Here's some example of font awesome icons declarations:
 * @sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @param       {String}       icons        The icons you want. Each line define a new icon
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fs:src/icons/vuejs.svg:vue
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginIconClassesInterface extends __SInterface {
    static get _definition() {
        return {
            icons: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' ', '\n'],
                },
                default: [],
                required: true,
            },
        };
    }
}
export { postcssSugarPluginIconClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ icons: [] }, params);
    const icons = finalParams.icons.map((iconStr) => {
        var _a, _b;
        const protocol = iconStr.split(':')[0];
        let splits, name, as;
        switch (protocol) {
            case 'fa':
            case 'fab':
            case 'far':
            case 'fal':
            case 'fad':
                splits = iconStr.split(':');
                name = splits[1];
                as = (_a = splits[2]) !== null && _a !== void 0 ? _a : name;
                return {
                    str: iconStr,
                    protocol,
                    name,
                    as,
                };
                break;
            case 'fs':
                splits = iconStr.split(':');
                const path = splits[1];
                as = (_b = splits[2]) !== null && _b !== void 0 ? _b : __fileName(path).split('.')[0];
                return {
                    str: iconStr,
                    protocol,
                    path,
                    name: as,
                    as: as,
                };
                break;
        }
    });
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Icons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/icons
        * @platform       css
        * @status       beta
        * 
        * These classes represent all the icons that you have listed in your project using the \`@sugar.icon.classes\` mixin.
        * By using this mixin, your icons will be accessible using the same \`s-icon:{name}\` classes
        * independently of the icon source that can be **Fontawesome** or your **Filesystem**.
        * These providers are the one that we support for now but others can be added if needed.
        * 
        * @feature      Allows you to use multiples sources and **keep the same usage classes**
        * @feature      Support for **Fontawesome** provider out of the box
        * @feature      Support for **local filesystem** icons
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${icons
        .map((iconObj) => {
        // @ts-ignore
        return ` * @cssClass      s-icon:${iconObj.as}      Display the \`${iconObj.as}\` icon`;
    })
        .join('\n')}
        * 
        * @example        html          Used icons in this website
        *   <div class="s-grid:5 @mobile s-grid:2">
        ${icons
        .map((iconObj) => {
        return ` *
        *   <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *     <i class="s-icon:${iconObj.as} s-font:70"></i><br/>
        *     <p class="s-typo:p s-mbs:20">${iconObj.as}</p>
        *     <p class="s-typo:p:bold">Source: ${iconObj === null || iconObj === void 0 ? void 0 : iconObj.protocol}</p>
        *   </div>`;
    })
        .join('\n')}
        *   </div>
        * 
        * @example      css
        * @sugar.icon.classes(
        ${icons
        .map((iconObj) => {
        // @ts-ignore
        return ` *    ${iconObj.str}`;
    })
        .join('\n')}
        * );
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    icons.forEach((iconObj) => {
        switch (iconObj === null || iconObj === void 0 ? void 0 : iconObj.protocol) {
            case 'fa':
            case 'fab':
            case 'far':
            case 'fal':
            case 'fad':
                vars.comment(() => `
                /**
                 * @name        s-icon:${iconObj.as}
                  * @namespace      sugar.css.icon
                  * @type           CssClass
                  * @platform       css
                  * @status         beta
                  *
                  * This class allows you to display the "<yellow>${iconObj.as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
                  *
                  * @example        html
                  * <i class="s-icon\:${iconObj.as} s-font\:20"></i>
                  * <i class="s-icon\:${iconObj.as} s-font\:40"></i>
                  * <i class="s-icon\:${iconObj.as} s-font\:60"></i>
                  * <i class="s-icon\:${iconObj.as} s-font\:80"></i>
                  * <i class="s-icon\:${iconObj.as} s-font\:100"></i>
                  * 
                  * @since      2.0.0
                  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                  */
                `).code(`
                  .s-icon--${iconObj.as} {
                    @sugar.icon.fa(${iconObj.name}, ${iconObj.protocol});
                  }
              `);
                break;
            case 'fs':
                vars.comment(() => `
                    /**
                     * @name        s-icon:${iconObj.as}
                      * @namespace      sugar.css.icon
                      * @type           CssClass
                      * @platform         css
                      * @status         beta
                      *
                      * This class allows you to display the "<yellow>${iconObj.as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
                      *
                      * @example        html
                      * <i class="s-icon\:${iconObj.as} s-font\:20"></i>
                      * <i class="s-icon\:${iconObj.as} s-font\:40"></i>
                      * <i class="s-icon\:${iconObj.as} s-font\:60"></i>
                      * <i class="s-icon\:${iconObj.as} s-font\:80"></i>
                      * <i class="s-icon\:${iconObj.as} s-font\:100"></i>
                      * 
                      * @since      2.0.0
                      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                      */
                    `).code(`
                      .s-icon--${iconObj.as} {
                        @sugar.icon.fs(${iconObj.path}, ${iconObj.as});
                      }
                  `);
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7aUJBQy9CO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7UUFDNUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLFFBQVEsUUFBUSxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEVBQUUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQUksSUFBSSxDQUFDO2dCQUN2QixPQUFPO29CQUNILEdBQUcsRUFBRSxPQUFPO29CQUNaLFFBQVE7b0JBQ1IsSUFBSTtvQkFDSixFQUFFO2lCQUNMLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELE9BQU87b0JBQ0gsR0FBRyxFQUFFLE9BQU87b0JBQ1osUUFBUTtvQkFDUixJQUFJO29CQUNKLElBQUksRUFBRSxFQUFFO29CQUNSLEVBQUUsRUFBRSxFQUFFO2lCQUNULENBQUM7Z0JBQ0YsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdUJKLEtBQUs7U0FDRixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNiLGFBQWE7UUFDYixPQUFPLDRCQUE0QixPQUFPLENBQUMsRUFBRSx1QkFBdUIsT0FBTyxDQUFDLEVBQUUsU0FBUyxDQUFDO0lBQzVGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJYixLQUFLO1NBQ0YsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDYixPQUFPOztpQ0FFZ0IsT0FBUSxDQUFDLEVBQUU7NkNBQ0MsT0FBUSxDQUFDLEVBQUU7aURBQ2IsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVE7bUJBQy9DLENBQUM7SUFDUixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQUtiLEtBQUs7U0FDRixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNiLGFBQWE7UUFDYixPQUFPLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdEIsUUFBUSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxFQUFFO1lBQ3ZCLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7O3lDQUVlLE9BQU8sQ0FBQyxFQUFFOzs7Ozs7b0VBTWlCLE9BQU8sQ0FBQyxFQUFFOzs7d0NBR3RDLE9BQU8sQ0FBQyxFQUFFO3dDQUNWLE9BQU8sQ0FBQyxFQUFFO3dDQUNWLE9BQU8sQ0FBQyxFQUFFO3dDQUNWLE9BQU8sQ0FBQyxFQUFFO3dDQUNWLE9BQU8sQ0FBQyxFQUFFOzs7OztpQkFLakMsQ0FDQSxDQUFDLElBQUksQ0FBQzs2QkFDTSxPQUFPLENBQUMsRUFBRTtxQ0FDRixPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxRQUFROztlQUV2RCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs2Q0FFbUIsT0FBTyxDQUFDLEVBQUU7Ozs7Ozt3RUFNaUIsT0FBTyxDQUFDLEVBQUU7Ozs0Q0FHdEMsT0FBTyxDQUFDLEVBQUU7NENBQ1YsT0FBTyxDQUFDLEVBQUU7NENBQ1YsT0FBTyxDQUFDLEVBQUU7NENBQ1YsT0FBTyxDQUFDLEVBQUU7NENBQ1YsT0FBTyxDQUFDLEVBQUU7Ozs7O3FCQUtqQyxDQUNKLENBQUMsSUFBSSxDQUFDO2lDQUNVLE9BQU8sQ0FBQyxFQUFFO3lDQUNGLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQUU7O21CQUVqRCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=