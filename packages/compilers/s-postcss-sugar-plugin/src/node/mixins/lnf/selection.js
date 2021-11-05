import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
}
postcssSugarPluginLiikAndFeelSelectionInterface.definition = {};
export { postcssSugarPluginLiikAndFeelSelectionInterface as interface };
/**
 * @name          selection
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Selection background and text color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * \@sugar.lnf.selection;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const css = `
        color: sugar.color(accent, 100);
        background-color: sugar.color(accent);
  `;
    vars.push(css);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDL0QsMERBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLCtDQUErQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLEdBQUcsR0FBRzs7O0dBR2IsQ0FBQztJQUVBLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=