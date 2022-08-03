import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixin.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example        css
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginClearfixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultClearfix: {
                type: 'String',
                default: __STheme.get('helpers.clearfix.default'),
            },
        };
    }
}
export { postcssSugarPluginClearfixClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ defaultClearfix: 'overflow' }, params);
    const vars = new CssVars();
    const clearfixes = ['overflow', 'facebook', 'micro', 'after'];
    const notStr = clearfixes
        .filter((c) => c !== finalParams.defaultClearfix)
        .map((c) => `:not(.s-clearfix--${c})`)
        .join('');
    vars.comment(() => `
      /**
        * @name          Clearfix
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/clearfix
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a clearfix on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${clearfixes
        .map((clearfixName) => {
        return ` * @cssClass     s-clearfixs-clearfix${clearfixName === finalParams.defaultClearfix
            ? ``
            : `:${clearfixName}`}            Apply the ${clearfixName} clearfix`;
    })
        .join('\n')}
        * 
        ${clearfixes
        .map((clearfixName) => {
        return ` * @example        html         ${clearfixName}
            *   <div class="s-clearfix${clearfixName === finalParams.defaultClearfix
            ? ``
            : `:${clearfixName}`} s-bg:ui">
            *       <img src="https://picsum.photos/200/200" style="float: right" />
            *   </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    clearfixes.forEach((clearfixName) => {
        vars.comment(() => `/**
                * @name          s-clearfix${clearfixName === finalParams.defaultClearfix
            ? ''
            : `:${clearfixName}`}
                * @namespace          sugar.style.clearfix
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${clearfixName}</yellow>" clearfix to any HTMLElement
                * 
                * @example        html
                * <div class="s-clearfix${clearfixName === finalParams.defaultClearfix
            ? ''
            : `:${clearfixName}`}">I'm a cool clearfix element</div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-clearfix${clearfixName === finalParams.defaultClearfix
            ? `${notStr}`
            : `--${clearfixName}`} {
                    @sugar.clearfix(${clearfixName});
                }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDcEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLGVBQWUsRUFBRSxVQUFVLElBQ3hCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELE1BQU0sTUFBTSxHQUFHLFVBQVU7U0FDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLGVBQWUsQ0FBQztTQUNoRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztTQUNyQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFZCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLFVBQVU7U0FDUCxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtRQUNsQixPQUFPLHdDQUNILFlBQVksS0FBSyxXQUFXLENBQUMsZUFBZTtZQUN4QyxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFDMUIseUJBQXlCLFlBQVksV0FBVyxDQUFDO0lBQ3JELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsVUFBVTtTQUNQLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1FBQ2xCLE9BQU8sbUNBQW1DLFlBQVk7d0NBRXRELFlBQVksS0FBSyxXQUFXLENBQUMsZUFBZTtZQUN4QyxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFDMUI7OztlQUdHLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs2Q0FFRSxZQUFZLEtBQUssV0FBVyxDQUFDLGVBQWU7WUFDeEMsQ0FBQyxDQUFDLEVBQUU7WUFDSixDQUFDLENBQUMsSUFBSSxZQUFZLEVBQzFCOzs7Ozs7OERBTThDLFlBQVk7OzswQ0FJdEQsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksWUFBWSxFQUMxQjs7Ozs7YUFLSCxDQUNKLENBQUMsSUFBSSxDQUNGOzZCQUVRLFlBQVksS0FBSyxXQUFXLENBQUMsZUFBZTtZQUN4QyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUU7WUFDYixDQUFDLENBQUMsS0FBSyxZQUFZLEVBQzNCO3NDQUNzQixZQUFZO2tCQUNoQyxFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=