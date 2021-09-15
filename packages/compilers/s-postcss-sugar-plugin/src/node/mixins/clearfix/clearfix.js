import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           clearfix
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a clearfix depending on your preference. Here's are the clearfix methods available:
 * - overflow (default)
 * - facebook
 * - float
 * - micro
 * - after
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.clearfix();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginClearfixInterface extends __SInterface {
}
postcssSugarPluginClearfixInterface.definition = {
    clearfix: {
        type: 'String',
        values: ['overflow', 'facebook', 'micro', 'after'],
        default: __theme().config('helpers.clearfix.default'),
    },
};
export { postcssSugarPluginClearfixInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ clearfix: 'overflow' }, params);
    const vars = [];
    switch (finalParams.clearfix) {
        case 'facebook':
            vars.push(`
                display: table-cell;
                vertical-align: top;
                width: 10000px !important;
            `);
            break;
        case 'micro':
            vars.push(`
                zoom: 1;
                &:before,
                &:after {
                    content: ' ';
                    display: table;
                }
                &:after {
                    clear: both;
                }
            `);
            break;
        case 'after':
            vars.push(`
                &:after {
                    content: "";
                    clear: both;
                    display: table;
                }
            `);
            break;
        case 'overflow':
            vars.push(`
                overflow: hidden;
            `);
            break;
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJmaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGVhcmZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUd4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ25ELDhDQUFVLEdBQUc7SUFDaEIsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztLQUN4RDtDQUNKLENBQUM7QUFPTixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixRQUFRLEVBQUUsVUFBVSxJQUNqQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDMUIsS0FBSyxVQUFVO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2FBVVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzthQU1ULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLFVBQVU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=