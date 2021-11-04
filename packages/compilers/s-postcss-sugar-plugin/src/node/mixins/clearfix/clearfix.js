import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
        default: __STheme.config('helpers.clearfix.default'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJmaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGVhcmZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ25ELDhDQUFVLEdBQUc7SUFDaEIsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFDbEQsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7S0FDdkQ7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsUUFBUSxFQUFFLFVBQVUsSUFDakIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQzFCLEtBQUssVUFBVTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OzthQVVULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7YUFNVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9