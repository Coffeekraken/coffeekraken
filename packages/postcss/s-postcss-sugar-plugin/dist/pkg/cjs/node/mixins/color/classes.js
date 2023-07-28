"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
class postcssSugarPluginClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginClassesMixinInterface;
/**
 * @name           classes
 * @as          @sugar.color.classes
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the colors helpers classes like s-tc:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @snippet         @sugar.color.classes
 *
 * @example        css
 * \@sugar.color.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith }) {
    const cssArray = new CssVars();
    cssArray.comment(() => `
      /**
        * @name          Colors
        * @namespace          sugar.style.helpers.color
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/colors
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to set text and background colors easily to any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.color.classes;
        * 
        * .my-element {
        *   \\@sugar.color(accent);
        * }                   
        * 
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
    })
        .join('\n')}
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
    })
        .join('\n')}
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-bg:${colorName}       Apply the ${colorName} background color`;
    })
        .join('\n')}
        *
        * @example        html          Text color
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return ` * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-tc:${colorName} s-mb:30">${faker_1.default.name.findName()}</div>`;
    })
        .join('\n')}
        *
        * @example        html          Background color
        ${Object.keys(s_theme_1.default.getTheme().baseColors())
        .map((colorName) => {
        return `  * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-bg:${colorName} s-p:10 s-mb:30 s-radius">${faker_1.default.name.findName()}</div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(s_theme_1.default.getTheme().baseColors()).forEach((colorName) => {
        cssArray
            .comment(() => `
      /**
       * @name        s-color:${colorName}
       * @namespace          sugar.style.helpers.color
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color:${colorName}">${colorName}</span>" text color to any ui element.
       * This does apply the color only on the item itself and not on his childs...
       * 
       * @example       html
       * <label>
       *   Hello world
       *   <input type="text" class="s-input s-color:${colorName}" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `)
            .code(`
                @sugar.lod.prevent {
                    .s-color--${colorName} {
                        @sugar.color(${colorName});
                    }
                }
    `, { type: 'CssClass' });
        cssArray
            .comment(() => [
            `/**`,
            ` * @name           s-bg:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bg:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n'))
            .code(`
                .s-bg--${colorName} {
                    background-color: sugar.color(${colorName}) !important;
                }
        `, { type: 'CssClass' });
    });
    s_theme_1.default.getTheme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        if (colorObj.shade) {
            return;
        }
        cssArray
            .comment(() => [
            `/**`,
            ` * @name           s-tc:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" text color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-tc:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n'))
            .code(`
                .s-tc--${colorName} {
                    color: sugar.color(${colorName}, text) !important;
                }
        `, { type: 'CssClass' });
        cssArray
            .comment(() => [
            `/**`,
            ` * @name           s-bg:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bg:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n'))
            .code(`
                .s-bg--${colorName} {
                    background-color: sugar.color(${colorName}) !important;
                }
        `, { type: 'CssClass' });
    });
    cssArray
        .comment(() => [
        `/**`,
        ` * @name           s-bg:odd`,
        ` * @namespace          sugar.style.helpers.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg:odd">`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
            .s-bg--odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `, { type: 'CssClass' });
    cssArray
        .comment(() => [
        `/**`,
        ` * @name           s-bg:even`,
        ` * @namespace          sugar.style.helpers.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         beta`,
        ` *`,
        ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg:even">`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` *     <li class="s-bg--accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
        .s-bg--even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `, { type: 'CssClass' });
    replaceWith(cssArray);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCLE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFDbUQsNERBQVM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxtQkFBeUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDN0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUvQixRQUFRLENBQUMsT0FBTyxDQUNaLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLG1DQUFtQyxTQUFTLG9CQUFvQixTQUFTLGdDQUFnQyxDQUFDO0lBQ3JILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7VUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLGdDQUFnQyxTQUFTLG9CQUFvQixTQUFTLGFBQWEsQ0FBQztJQUMvRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFB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