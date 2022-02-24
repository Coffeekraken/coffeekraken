import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.userSelect
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the user-select helper classes like ```.s-user-select:none```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
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
        * @namespace          sugar.css.helpers
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
    [
        'all', 'auto', 'none', 'text'
    ].forEach((value) => {
        vars.push(`/**
    * @name          s-user-select:${value}
    * @namespace          sugar.css.whiteSpace
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBdUJJLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7S0FNdEMsQ0FBQyxDQUFDO0lBRUg7UUFDSSxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNO0tBQzdCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQztxQ0FDbUIsS0FBSzs7Ozs7O2tEQU1RLEtBQUs7OztrQ0FHckIsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztzQkFFL0MsS0FBSzt1QkFDSixLQUFLO01BQ3RCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9