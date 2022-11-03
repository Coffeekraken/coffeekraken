import __SGlob from '@coffeekraken/s-glob';
import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import { __isGlob } from '@coffeekraken/sugar/is';
import { __packagePath } from '@coffeekraken/sugar/npm';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
    const iconsObjs = [], iconsPaths = [];
    finalParams.icons.forEach((iconStr) => {
        var _a, _b;
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
            case 'sugar':
                splits = iconStr.split(':');
                name = __unquote(splits[1])
                    .replace(/^('|"|`)/, '')
                    .replace(/('|"|`)$/, '');
                as = (_b = splits[2]) !== null && _b !== void 0 ? _b : name;
                // handle globs
                if (__isGlob(name)) {
                    const files = __SGlob.resolve(`${__packagePath('@coffeekraken/sugar')}/src/icons/${name}`, {
                        cwd: __packageRootDir(),
                    });
                    files.forEach((file) => {
                        iconsPaths.push(file.relPath);
                    });
                }
                else {
                    iconsPaths.push(`${__packagePath('@coffeekraken/sugar')}/src/icons/${name}.svg`);
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
            case 'sugar':
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
                                @sugar.icon.sugar(${iconObj.path}, ${iconObj.as});
                            }
                        `, { type: 'CssClass' });
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBVSxFQUFFLEVBQ3ZCLFVBQVUsR0FBYSxFQUFFLENBQUM7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