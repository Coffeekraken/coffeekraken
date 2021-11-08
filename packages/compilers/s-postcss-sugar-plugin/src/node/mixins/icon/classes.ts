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

export interface IPostcssSugarPluginIconClassesParams {
    icons: string[];
}

export { postcssSugarPluginIconClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginIconClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginIconClassesParams = {
        icons: [],
        ...params,
    };

    const icons = finalParams.icons.map((iconStr) => {
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
                as = splits[2] ?? name;
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

    const vars: string[] = [];

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
        *     <i class="s-icon:${(<any>iconObj).as} s-font:50"></i><br/>
        *     <p class="s-typo:p s-mbs:20">${(<any>iconObj).as}</p>
        *     <p class="s-typo:p:bold">Source: ${iconObj?.protocol}</p>
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
        switch (iconObj?.protocol) {
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
