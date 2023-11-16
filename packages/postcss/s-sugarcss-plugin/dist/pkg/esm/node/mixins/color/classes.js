import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class SSugarcssPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @as          @s.color.classes
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the colors helpers classes like s-tc:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @snippet         @s.color.classes
 *
 * @example        css
 * @s.color.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith }) {
    const cssArray = new CssVars();
    cssArray.comment(() => `
      /**
        * @name          Colors
        * @namespace          sugar.style.helpers.color
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/colors
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to set text and background colors easily to any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.color.classes;
        * 
        * .my-element {
        *   @s.color(accent);
        * }                   
        * 
        ${Object.keys(__STheme.current.baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.current.baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.current.baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-bc:${colorName}       Apply the ${colorName} background color`;
    })
        .join('\n')}
        *
        * @example        html          Text color
        ${Object.keys(__STheme.current.baseColors())
        .map((colorName) => {
        return ` * <div class="s-tc:${colorName} s-mb:30">${colorName}</div>`;
    })
        .join('\n')}
        *
        * @example        html          Background color
        ${Object.keys(__STheme.current.baseColors())
        .map((colorName) => {
        return ` * <div class="s-bc:${colorName} s-p:10 s-mb:30 s-radius">${colorName}</div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(__STheme.current.baseColors()).forEach((colorName) => {
        cssArray
            .comment(() => `
      /**
       * @name        s-color:${colorName}
       * @namespace          sugar.style.helpers.color
       * @type          CssClass
       * @status        stable
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
                @s.lod.prevent {
                    .s-color-${colorName} {
                        @s.color(${colorName});
                    }
                }
    `, { type: 'CssClass' });
        cssArray
            .comment(() => [
            `/**`,
            ` * @name           s-bc:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         stable`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bc:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n'))
            .code(`
                .s-bc-${colorName} {
                    background-color: s.color(${colorName}) !important;
                }
        `, { type: 'CssClass' });
    });
    __STheme.current.loopOnColors((colorObj) => {
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
            ` * @status         stable`,
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
                .s-tc-${colorName} {
                    color: s.color(${colorName}, text) !important;
                }
        `, { type: 'CssClass' });
        cssArray
            .comment(() => [
            `/**`,
            ` * @name           s-bc:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         stable`,
            ` *`,
            ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-bc:${colorName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
        ].join('\n'))
            .code(`
                .s-bc-${colorName} {
                    background-color: s.color(${colorName}) !important;
                }
        `, { type: 'CssClass' });
    });
    cssArray
        .comment(() => [
        `/**`,
        ` * @name           s-bc:odd`,
        ` * @namespace          sugar.style.helpers.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         stable`,
        ` *`,
        ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bc:odd">`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
            .s-bc-odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `, { type: 'CssClass' });
    cssArray
        .comment(() => [
        `/**`,
        ` * @name           s-bc:even`,
        ` * @namespace          sugar.style.helpers.color`,
        ` * @type           CssClass`,
        ` * @platform       css`,
        ` * @status         stable`,
        ` *`,
        ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bc:even">`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` *     <li class="s-bc-accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
        .s-bc-even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `, { type: 'CssClass' });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDN0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUvQixRQUFRLENBQUMsT0FBTyxDQUNaLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdkMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLG1DQUFtQyxTQUFTLG9CQUFvQixTQUFTLGdDQUFnQyxDQUFDO0lBQ3JILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7VUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdkMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLGdDQUFnQyxTQUFTLG9CQUFvQixTQUFTLGFBQWEsQ0FBQztJQUMvRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFD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