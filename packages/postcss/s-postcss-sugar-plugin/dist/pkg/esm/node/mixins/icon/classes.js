import __SGlob from '@coffeekraken/s-glob';
import __SInterface from '@coffeekraken/s-interface';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
/**
 * @name           classes
 * @namespace      node.mixin.icon
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
 * @return        {Css}         The generated css
 *
 * @example        css
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
    const iconsObjs = [];
    finalParams.icons.forEach((iconStr) => {
        var _a;
        const protocol = iconStr.split(':')[0];
        let splits, name, as, path;
        switch (protocol) {
            case 'fa':
            case 'fas':
            case 'fab':
            case 'far':
            case 'fal':
            case 'fad':
                splits = iconStr.split(':');
                name = splits[1];
                as = (_a = splits[2]) !== null && _a !== void 0 ? _a : name;
                iconsObjs.push({
                    str: iconStr,
                    protocol,
                    name,
                    as,
                });
                break;
            case 'fs':
                splits = iconStr.split(':');
                path = __unquote(splits[1])
                    .replace(/^('|"|`)/, '')
                    .replace(/('|"|`)$/, '');
                as = splits[2];
                const iconsPaths = [];
                // handle globs
                if (__isGlob(path)) {
                    const files = __SGlob.resolve(path, {
                        cwd: __packageRoot(),
                    });
                    files.forEach((file) => {
                        iconsPaths.push(file.relPath);
                    });
                }
                else {
                    iconsPaths.push(path);
                }
                iconsPaths.forEach((iconPath) => {
                    const iconAs = as !== null && as !== void 0 ? as : __fileName(iconPath).split('.')[0];
                    iconsObjs.push({
                        str: iconStr,
                        protocol,
                        path: iconPath,
                        name: iconAs,
                        as: iconAs,
                    });
                });
                break;
        }
    });
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Icons
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/icons
        * @platform       css
        * @status       beta
        * 
        * These classes represent all the icons that you have listed in your project using the @sugar.icon.classes mixin.
        * By using this mixin, your icons will be accessible using the same s-icon:{name} classes
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
        ${iconsObjs
        .map((iconObj) => {
        // @ts-ignore
        return ` * @cssClass      s-icon:${iconObj.as}      Display the ${iconObj.as} icon`;
    })
        .join('\n')}
        * 
        * @example        html          Used icons in this website
        *   <div class="s-grid:5 @mobile s-grid:2">
        ${iconsObjs
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
        * @sugar.icon.classes("
        ${iconsObjs
        .map((iconObj) => {
        // @ts-ignore
        return ` *    ${(iconObj.str.replace(/("|'|`)/gm), '')}`;
    })
        .join('\n')}
        * ");
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    iconsObjs.forEach((iconObj) => {
        switch (iconObj === null || iconObj === void 0 ? void 0 : iconObj.protocol) {
            case 'fa':
            case 'fab':
            case 'far':
            case 'fal':
            case 'fad':
                vars.comment(() => `
                /**
                 * @name        s-icon:${iconObj.as}
                  * @namespace          sugar.style.icon
                  * @type           CssClass
                  * @platform       css
                  * @status         beta
                  *
                  * ef
                  *
                  * @example        html
                  * <i class="s-icon:${iconObj.as} s-font:20"></i>
                  * <i class="s-icon:${iconObj.as} s-font:40"></i>
                  * <i class="s-icon:${iconObj.as} s-font:60"></i>
                  * <i class="s-icon:${iconObj.as} s-font:80"></i>
                  * <i class="s-icon:${iconObj.as} s-font:100"></i>
                  * 
                  * @since      2.0.0
                  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                  */
                `).code(`
                  .s-icon--${iconObj.as} {
                    @sugar.icon.fa(${iconObj.name}, ${iconObj.protocol});
                  }
              `, { type: 'CssClass' });
                break;
            case 'fs':
                vars.comment(() => `
                        /**
                         * @name        s-icon:${iconObj.as}
                         * @namespace          sugar.style.icon
                         * @type           CssClass
                         * @platform         css
                         * @status         beta
                         *
                         * efe
                         *
                         * @example        html
                         * <i class="s-icon:${iconObj.as} s-font:20"></i>
                         * <i class="s-icon:${iconObj.as} s-font:40"></i>
                         * <i class="s-icon:${iconObj.as} s-font:60"></i>
                         * <i class="s-icon:${iconObj.as} s-font:80"></i>
                         * <i class="s-icon:${iconObj.as} s-font:100"></i>
                         * 
                         * @since      2.0.0
                         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        `).code(`
                        .s-icon--${iconObj.as} {
                            @sugar.icon.fs(${iconObj.path}, ${iconObj.as});
                        }
                    `, { type: 'CssClass' });
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBRWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO2lCQUMvQjtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFVLEVBQUUsQ0FBQztJQUU1QixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztRQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FB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