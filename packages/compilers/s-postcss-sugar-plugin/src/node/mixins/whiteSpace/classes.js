import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.visibility
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.visibility.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginWrapClassesInterface extends __SInterface {
}
postcssSugarPluginWrapClassesInterface.definition = {};
export { postcssSugarPluginWrapClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          White space
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/white-space
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some white-space style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-white-space:wrap             Apply the \`white-space\` to \`wrap\`
        * @cssClass         s-white-space:nowrap             Apply the \`white-space\` to \`nowrap\`
        * @cssClass         s-white-space:break-spaces             Apply the \`white-space\` to \`break-spaces\`
        * @cssClass         s-white-space:normal             Apply the \`white-space\` to \`normal\`
        * @cssClass         s-white-space:pre             Apply the \`white-space\` to \`pre\`
        * @cssClass         s-white-space:pre-line             Apply the \`white-space\` to \`pre-line\`
        * @cssClass         s-white-space:pre-wrap             Apply the \`white-space\` to \`pre-wrap\`
        * @cssClass         s-white-space:revert             Apply the \`white-space\` to \`revert\`
        * @cssClass         s-white-space:unset             Apply the \`white-space\` to \`unset\`
        * 
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Wrap</h3>
        *   <p class="s-white-space:wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">nowrap</h3>
        *   <p class="s-white-space:nowrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Break spaces</h3>
        *   <p class="s-white-space:break-spaces">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Normal</h3>
        *   <p class="s-white-space:normal">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Pre</h3>
        *   <p class="s-white-space:pre">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Pre line</h3>
        *   <p class="s-white-space:pre-line">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Pre wrap</h3>
        *   <p class="s-white-space:pre-wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Revert</h3>
        *   <p class="s-white-space:revert">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Unset</h3>
        *   <p class="s-white-space:unset">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    [
        'wrap',
        'nowrap',
        'break-spaces',
        'normal',
        'pre',
        'pre-line',
        'pre-wrap',
        'revert',
        'unset',
    ].forEach((value) => {
        vars.push(`/**
    * @name          s-white-space:${value}
    * @namespace          sugar.css.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" white-space style to any HTMLElement
    * 
    * @example        html
    * <div class="s-white-space:${value}">${__faker.lorem.paragraph()}</div>
    */
    .s-white-space--${value} {
        white-space: ${value};
    }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBOEJJLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7O2tCQU96QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7OztrQkFPekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7a0JBT3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7O2tCQU96QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7OztrQkFPekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7a0JBT3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7O2tCQU96QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7OztrQkFPekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7S0FPdEMsQ0FBQyxDQUFDO0lBRUg7UUFDSSxNQUFNO1FBQ04sUUFBUTtRQUNSLGNBQWM7UUFDZCxRQUFRO1FBQ1IsS0FBSztRQUNMLFVBQVU7UUFDVixVQUFVO1FBQ1YsUUFBUTtRQUNSLE9BQU87S0FDVixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUM7cUNBQ21CLEtBQUs7Ozs7OztrREFNUSxLQUFLOzs7a0NBR3JCLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7c0JBRS9DLEtBQUs7dUJBQ0osS0FBSztNQUN0QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=