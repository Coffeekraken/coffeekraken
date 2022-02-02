import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginClearfixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultClearfix: {
                type: 'String',
                default: __STheme.config('helpers.clearfix.default'),
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
        * @namespace          sugar.css.helpers
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    clearfixes.forEach((clearfixName) => {
        vars.comment(() => `/**
                * @name          s-clearfix${clearfixName === finalParams.defaultClearfix
            ? ''
            : `:${clearfixName}`}
                * @namespace          sugar.css.clearfix
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
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
            `).code(`
                .s-clearfix${clearfixName === finalParams.defaultClearfix
            ? `${notStr}`
            : `--${clearfixName}`} {
                    @sugar.clearfix(${clearfixName});
                }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGVBQWUsRUFBRTtnQkFDYixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQzthQUN2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsZUFBZSxFQUFFLFVBQVUsSUFDeEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sVUFBVSxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsTUFBTSxNQUFNLEdBQUcsVUFBVTtTQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsZUFBZSxDQUFDO1NBQ2hELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1NBQ3JDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVkLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQkosVUFBVTtTQUNQLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1FBQ2xCLE9BQU8sd0NBQ0gsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksWUFBWSxFQUMxQix5QkFBeUIsWUFBWSxXQUFXLENBQUM7SUFDckQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFYixVQUFVO1NBQ1AsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDbEIsT0FBTyxtQ0FBbUMsWUFBWTt3Q0FFdEQsWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksWUFBWSxFQUMxQjs7O2VBR0csQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZDQUVFLFlBQVksS0FBSyxXQUFXLENBQUMsZUFBZTtZQUN4QyxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFDMUI7Ozs7Ozs4REFNOEMsWUFBWTs7OzBDQUl0RCxZQUFZLEtBQUssV0FBVyxDQUFDLGVBQWU7WUFDeEMsQ0FBQyxDQUFDLEVBQUU7WUFDSixDQUFDLENBQUMsSUFBSSxZQUFZLEVBQzFCOzs7OzthQUtILENBQ0osQ0FBQyxJQUFJLENBQUM7NkJBRUssWUFBWSxLQUFLLFdBQVcsQ0FBQyxlQUFlO1lBQ3hDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRTtZQUNiLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFDM0I7c0NBQ3NCLFlBQVk7a0JBQ2hDLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==