import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
}
postcssSugarPluginLiikAndFeelBaseInterface.definition = {};
export { postcssSugarPluginLiikAndFeelBaseInterface as interface };
/**
 * @name          base
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Page background using the <s-color="accent">background</s-color> theme color
 * - Text color using the <s-color="accent">default</s-color> theme color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * \@sugar.lnf.base;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const css = `
    background-color: sugar.color(main, background);
    color: sugar.color(main, text);
    @sugar.font.family(default);
    @sugar.font.size(default);

    ::selection {
      color: sugar.color(accent, 100);
      background-color: sugar.color(accent);
    }
  `;
    vars.push(css);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHLEVBQ25CLENBQUM7QUFNSixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7OztHQVVYLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==