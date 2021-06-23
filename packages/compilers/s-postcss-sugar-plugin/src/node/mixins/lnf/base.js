import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
}
postcssSugarPluginLiikAndFeelBaseInterface.definition = {
    layout: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginLiikAndFeelBaseInterface as interface };
/**
 * @name          base
 * @namespace     sugar.postcss.mixin.lnf
 * @type          PostcssMixin
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
    let selector = '&';
    if (atRule.parent && atRule.parent.type === 'root') {
        selector = 'html';
    }
    const vars = [
        `
    @sugar.scope(lnf) {
        ${selector} {
            color: sugar.color(main, text);
            @sugar.font.family(default);
            @sugar.font.size(default);
        }
        ::selection {
            color: sugar.color(accent, text);
            background-color: sugar.color(accent);
        }
    }
    `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDbkIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNsRCxRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQ25CO0lBRUEsTUFBTSxJQUFJLEdBQWE7UUFDdEI7O1VBRU0sUUFBUTs7Ozs7Ozs7OztLQVViO0tBQ0YsQ0FBQztJQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=