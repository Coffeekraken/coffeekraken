import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginClassesMixinInterface as interface };
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
 * \@s.color.classes;
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
        * \\@s.color.classes;
        * 
        * .my-element {
        *   \\@s.color(accent);
        * }                   
        * 
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
    })
        .join('\n')}
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * @cssClass            s-bg:${colorName}       Apply the ${colorName} background color`;
    })
        .join('\n')}
        *
        * @example        html          Text color
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-tc:${colorName} s-mb:30">${__faker.name.findName()}</div>`;
    })
        .join('\n')}
        *
        * @example        html          Background color
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return `  * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-bg:${colorName} s-p:10 s-mb:30 s-radius">${__faker.name.findName()}</div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
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
            ` * @name           s-bg:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         stable`,
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
                .s-bg-${colorName} {
                    background-color: s.color(${colorName}) !important;
                }
        `, { type: 'CssClass' });
    });
    __STheme.getTheme().loopOnColors((colorObj) => {
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
            ` * @name           s-bg:${colorName}`,
            ` * @namespace          sugar.style.helpers.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         stable`,
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
                .s-bg-${colorName} {
                    background-color: s.color(${colorName}) !important;
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
        ` * @status         stable`,
        ` *`,
        ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg:odd">`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
            .s-bg-odd > *:nth-child(even) {
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
        ` * @status         stable`,
        ` *`,
        ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <ol class="s-bg:even">`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` *     <li class="s-bg-accent">Something cool</li>`,
        ` * </li>`,
        ` */`,
    ].join('\n'))
        .code(`
        .s-bg-even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `, { type: 'CssClass' });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFO0lBQzdELE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFL0IsUUFBUSxDQUFDLE9BQU8sQ0FDWixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLG1DQUFtQyxTQUFTLG9CQUFvQixTQUFTLGdDQUFnQyxDQUFDO0lBQ3JILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7VUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMxQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sZ0NBQWdDLFNBQVMsb0JBQW9CLFNBQVMsYUFBYSxDQUFDO0lBQy9GLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7VUFD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