import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
}
postcssSugarPluginDocblockColorsMixinInterface.definition = {};
export { postcssSugarPluginDocblockColorsMixinInterface as interface };
/**
 * @name           docblocks
 * @namespace      mixins.color
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [];
    const colorsObj = __STheme.config('color');
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            const colorValue = colorObj[modifier];
            cssArray.push([
                `/**`,
                ` * @name 		    ${colorName}`,
                ` * @modifier        ${modifier}`,
                ` * @namespace       sugar.css.theme.${__STheme.name}.colors`,
                ` * @type            color`,
                ` * @platform       css`,
                ` * @status         stable`,
                ` *`,
                ` * This is the "${colorName}${modifier !== 'default' ? `-${modifier}` : ''}" registered color`,
                ` *`,
                ` * @color 		${colorValue}`,
                ` */`,
            ].join('\n'));
        });
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sOENBQStDLFNBQVEsWUFBWTs7QUFDOUQseURBQVUsR0FBRyxFQUFFLENBQUM7QUFFM0IsT0FBTyxFQUFFLDhDQUE4QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXZFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUNwRCxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN6QixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsUUFBUSxDQUFDLElBQUksQ0FDVDtnQkFDSSxLQUFLO2dCQUNMLGtCQUFrQixTQUFTLEVBQUU7Z0JBQzdCLHVCQUF1QixRQUFRLEVBQUU7Z0JBQ2pDLHVDQUF1QyxRQUFRLENBQUMsSUFBSSxTQUFTO2dCQUM3RCwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsMkJBQTJCO2dCQUMzQixJQUFJO2dCQUNKLG1CQUFtQixTQUFTLEdBQ3hCLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzlDLG9CQUFvQjtnQkFDcEIsSUFBSTtnQkFDSixlQUFlLFVBQVUsRUFBRTtnQkFDM0IsS0FBSzthQUNSLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==