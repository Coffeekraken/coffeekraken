"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const npm_1 = require("@coffeekraken/sugar/npm");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
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
class postcssSugarPluginIconClassesInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginIconClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
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
                path = (0, string_1.__unquote)(splits[1])
                    .replace(/^('|"|`)/, '')
                    .replace(/('|"|`)$/, '');
                as = splits[2];
                // handle globs
                if ((0, is_1.__isGlob)(path)) {
                    const files = s_glob_1.default.resolve(path, {
                        cwd: (0, path_1.__packageRootDir)(),
                    });
                    files.forEach((file) => {
                        iconsPaths.push(file.relPath);
                    });
                }
                else {
                    iconsPaths.push(path);
                }
                iconsPaths.forEach((iconPath) => {
                    const iconAs = as !== null && as !== void 0 ? as : (0, fs_1.__fileName)(iconPath).split('.')[0];
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
                name = (0, string_1.__unquote)(splits[1])
                    .replace(/^('|"|`)/, '')
                    .replace(/('|"|`)$/, '');
                as = (_b = splits[2]) !== null && _b !== void 0 ? _b : name;
                // handle globs
                if ((0, is_1.__isGlob)(name)) {
                    const files = s_glob_1.default.resolve(`${(0, npm_1.__packagePath)('@coffeekraken/sugar')}/src/icons/${name}`, {
                        cwd: (0, path_1.__packageRootDir)(),
                    });
                    files.forEach((file) => {
                        iconsPaths.push(file.relPath);
                    });
                }
                else {
                    iconsPaths.push(`${(0, npm_1.__packagePath)('@coffeekraken/sugar')}/src/icons/${name}.svg`);
                }
                iconsPaths.forEach((iconPath) => {
                    const iconAs = as !== null && as !== void 0 ? as : (0, fs_1.__fileName)(iconPath).split('.')[0];
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUEyQztBQUMzQyw0RUFBcUQ7QUFDckQsK0NBQW9EO0FBQ3BELCtDQUFrRDtBQUNsRCxpREFBd0Q7QUFDeEQsbURBQTREO0FBQzVELHVEQUF1RDtBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7aUJBQy9CO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1rRCwyREFBUztBQUU1RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBVSxFQUFFLEVBQ3ZCLFVBQVUsR0FBYSxFQUFFLENBQUM7SUFFOUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7UUFDbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztRQUMzQixRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FB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