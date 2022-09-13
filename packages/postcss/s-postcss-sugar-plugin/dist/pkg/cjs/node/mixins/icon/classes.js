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
                path = (0, string_1.__unquote)(splits[1])
                    .replace(/^('|"|`)/, '')
                    .replace(/('|"|`)$/, '');
                as = splits[2];
                const iconsPaths = [];
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUEyQztBQUMzQyw0RUFBcUQ7QUFDckQsK0NBQW9EO0FBQ3BELCtDQUFrRDtBQUNsRCxtREFBNEQ7QUFDNUQsdURBQXVEO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTWtELDJEQUFTO0FBRTVELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFVLEVBQUUsQ0FBQztJQUU1QixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztRQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO1FBQzNCLFFBQVEsUUFBUSxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSyxDQUFDO1lB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