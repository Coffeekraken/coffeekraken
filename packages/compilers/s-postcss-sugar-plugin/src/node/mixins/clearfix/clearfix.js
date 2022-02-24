import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           clearfix
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginClearfixInterface extends __SInterface {
    static get _definition() {
        return {
            clearfix: {
                type: 'String',
                values: ['overflow', 'facebook', 'micro', 'after'],
                default: __STheme.config('helpers.clearfix.default'),
            },
        };
    }
}
export { postcssSugarPluginClearfixInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ clearfix: 'overflow' }, params);
    const vars = new CssVars();
    switch (finalParams.clearfix) {
        case 'facebook':
            vars.code(`
                display: table-cell;
                vertical-align: top;
                width: 10000px !important;
            `);
            break;
        case 'micro':
            vars.code(`
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
            vars.code(`
                &:after {
                    content: "";
                    clear: both;
                    display: table;
                }
            `);
            break;
        case 'overflow':
            vars.code(`
                overflow: hidden;
            `);
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJmaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGVhcmZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ2xELE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2FBQ3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixRQUFRLEVBQUUsVUFBVSxJQUNqQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQzFCLEtBQUssVUFBVTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OzthQVVULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7YUFNVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=