import __SGlob from '@coffeekraken/s-glob';
import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import { __unquote } from '@coffeekraken/sugar/string';
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
                        cwd: __packageRootDir(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7aUJBQy9CO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQVUsRUFBRSxDQUFDO0lBRTVCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1FBQ2xDLE1BQU0sUUFBUSxH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