import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.icon
 * @type           PostcssMixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginIconClassesInterface extends __SInterface {
}
postcssSugarPluginIconClassesInterface.definition = {
    icons: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' ', '\n'],
        },
        default: [],
        required: true,
    },
};
export { postcssSugarPluginIconClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ icons: [] }, params);
    const icons = finalParams.icons.map((iconStr) => {
        var _a;
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
                as = splits[2];
                return {
                    str: iconStr,
                    protocol,
                    path,
                    icon: as,
                    as: as,
                };
                break;
        }
    });
    const vars = [];
    vars.push(`
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
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Icons (non-exhaustive)</h3>
        *   <div class="s-grid:5">
        ${icons
        .map((iconObj) => {
        return ` *
        *   <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *     <i class="s-icon:${iconObj.as} s-font:50"></i><br/>
        *     <p class="s-typo:p s-mbs:20">${iconObj.as}</p>
        *     <p class="s-typo:p:bold">Source: ${iconObj === null || iconObj === void 0 ? void 0 : iconObj.protocol}</p>
        *   </div>`;
    })
        .join('\n')}
        *   </div>
        * </div>
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    icons.forEach((iconObj) => {
        switch (iconObj === null || iconObj === void 0 ? void 0 : iconObj.protocol) {
            case 'fa':
            case 'fab':
            case 'far':
            case 'fal':
            case 'fad':
                vars.push(`
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
                  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                  */
                  .s-icon--${iconObj.as} {
                    @sugar.icon.fa(${iconObj.name}, ${iconObj.protocol});
                  }
              `);
                break;
            case 'fs':
                vars.push(`
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
                      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                      */
                      .s-icon--${iconObj.as} {
                        @sugar.icon.fs(${iconObj.path}, ${iconObj.as});
                      }
                  `);
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDdEQsaURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztTQUMvQjtRQUNELE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1FBQzVDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNyQixRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FB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