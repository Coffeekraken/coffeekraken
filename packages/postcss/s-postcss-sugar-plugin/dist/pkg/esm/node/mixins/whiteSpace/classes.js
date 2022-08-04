import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixin.visibility
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.visibility.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginWrapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginWrapClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(`
      /**
        * @name          White space
        * @namespace          sugar.style.helpers
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
        * @example        html          Wrap
        *   <p class="s-white-space:wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Nowrap
        *   <p class="s-white-space:nowrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Break spaces
        *   <p class="s-white-space:break-spaces">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Normal
        *   <p class="s-white-space:normal">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre
        *   <p class="s-white-space:pre">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-line
        *   <p class="s-white-space:pre-line">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-wrap
        *   <p class="s-white-space:pre-wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Revert
        *   <p class="s-white-space:revert">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Unset
        *   <p class="s-white-space:unset">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        vars.comment(`/**
    * @name          s-white-space:${value}
    * @namespace          sugar.style.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" white-space style to any HTMLElement
    * 
    * @example        html
    * <div class="s-white-space:${value}">${__faker.lorem.paragraph()}</div>
    */
   `).code(`
    .s-white-space--${value} {
        white-space: ${value};
    }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNEJDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7O0tBTXRDLENBQUMsQ0FBQztJQUVIO1FBQ0ksTUFBTTtRQUNOLFFBQVE7UUFDUixjQUFjO1FBQ2QsUUFBUTtRQUNSLEtBQUs7UUFDTCxVQUFVO1FBQ1YsVUFBVTtRQUNWLFFBQVE7UUFDUixPQUFPO0tBQ1YsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNoQixJQUFJLENBQUMsT0FBTyxDQUNSO3FDQUN5QixLQUFLOzs7Ozs7a0RBTVEsS0FBSzs7O2tDQUdyQixLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7O0lBRWpFLENBQ0ssQ0FBQyxJQUFJLENBQ0Y7c0JBQ1UsS0FBSzt1QkFDSixLQUFLO01BQ3RCLEVBQ00sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==