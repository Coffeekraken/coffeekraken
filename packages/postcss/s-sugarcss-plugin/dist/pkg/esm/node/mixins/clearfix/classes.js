import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as              @s.clearfix.classes
 * @namespace      node.mixin.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @snippet         @s.clearfix.classes
 *
 * @example        css
 * @s.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginClearfixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultClearfix: {
                type: 'String',
                default: __STheme.current.get('helpers.clearfix.default'),
            },
        };
    }
}
export { SSugarcssPluginClearfixClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ defaultClearfix: 'overflow' }, params);
    const vars = new CssVars();
    const clearfixes = ['overflow', 'facebook', 'micro', 'after'];
    const notStr = clearfixes
        .filter((c) => c !== finalParams.defaultClearfix)
        .map((c) => `:not(.s-clearfix-${c})`)
        .join('');
    vars.comment(() => `
      /**
        * @name          Clearfix
        * @namespace          sugar.style.helpers.clearfix
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/clearfix
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply a clearfix on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.clearfix.classes;
        * 
        * .my-element {
        *   @s.clearfix;
        * }         
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
            : `:${clearfixName}`} s-bc:ui">
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
                * @status           stable
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
            : `-${clearfixName}`} {
                    @s.clearfix(${clearfixName});
                }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQzVEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixlQUFlLEVBQUUsVUFBVSxJQUN4QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxNQUFNLE1BQU0sR0FBRyxVQUFVO1NBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxlQUFlLENBQUM7U0FDaEQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7U0FDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosVUFBVTtTQUNQLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1FBQ2xCLE9BQU8sd0NBQ0gsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksWUFBWSxFQUMxQix5QkFBeUIsWUFBWSxXQUFXLENBQUM7SUFDckQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFYixVQUFVO1NBQ1AsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDbEIsT0FBTyxtQ0FBbUMsWUFBWTt3Q0FFdEQsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksWUFBWSxFQUMxQjs7O2VBR0csQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZDQUVFLFlBQVksS0FBSyxXQUFXLENBQUMsZUFBZTtZQUN4QyxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFDMUI7Ozs7Ozs4REFNOEMsWUFBWTs7OzBDQUl0RCxZQUFZLEtBQUssV0FBVyxDQUFDLGVBQWU7WUFDeEMsQ0FBQyxDQUFDLEVBQUU7WUFDSixDQUFDLENBQUMsSUFBSSxZQUFZLEVBQzFCOzs7OzthQUtILENBQ0osQ0FBQyxJQUFJLENBQ0Y7NkJBRVEsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRTtZQUNiLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFDMUI7a0NBQ2tCLFlBQVk7a0JBQzVCLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==