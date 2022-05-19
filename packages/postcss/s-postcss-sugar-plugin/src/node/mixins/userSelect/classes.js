import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixin.userSelect
 * @type           PostcssMixin
 * @interface   ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the user-select helper classes like ```.s-user-select:none```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.userSelect.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUserSelectClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUserSelectClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          User select
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/user-select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some user-select style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-user-select:all             Apply the \`user-select\` to \`all\`
        * @cssClass         s-user-select:auto             Apply the \`user-select\` to \`auto\`
        * @cssClass         s-user-select:none             Apply the \`user-select\` to \`none\`
        * @cssClass         s-user-select:text             Apply the \`user-select\` to \`text\`
        * 
        * @example        html          All
        *   <p class="s-user-select:all">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            auto
        *   <p class="s-user-select:auto">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            none
        *   <p class="s-user-select:none">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                text
        *   <p class="s-user-select:text">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    ['all', 'auto', 'none', 'text'].forEach((value) => {
        vars.push(`/**
    * @name          s-user-select:${value}
    * @namespace          sugar.style.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" user-select style to any HTMLElement
    * 
    * @example        html
    * <div class="s-user-select:${value}">${__faker.lorem.paragraph()}</div>
    */
    .s-user-select--${value} {
        user-select: ${value};
    }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF1QkksT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7OztLQU10QyxDQUFDLENBQUM7SUFFSCxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7cUNBQ21CLEtBQUs7Ozs7OztrREFNUSxLQUFLOzs7a0NBR3JCLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7c0JBRS9DLEtBQUs7dUJBQ0osS0FBSztNQUN0QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==