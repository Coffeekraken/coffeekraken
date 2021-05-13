import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
}
postcssSugarPluginDocblockColorsMixinInterface.definition = {};
export { postcssSugarPluginDocblockColorsMixinInterface as interface };
/**
 * @name           docblocks
 * @namespace      mixins.color
 * @type           Mixin
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
export default function ({ params, atRule, processNested }) {
    const cssArray = [];
    const colorsObj = __theme().config('color');
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            const colorValue = colorObj[modifier];
            cssArray.push([
                `/**`,
                ` * @name 		    ${colorName}`,
                ` * @modifier        ${modifier}`,
                ` * @namespace       sugar.css.theme.${__theme().name}.colors`,
                ` * @type            color`,
                ` *`,
                ` * This is the "${colorName}${modifier !== 'default' ? `-${modifier}` : ''}" registered color`,
                ` *`,
                ` * @color 		${colorValue}`,
                ` */`
            ].join('\n'));
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sOENBQStDLFNBQVEsWUFBWTs7QUFDaEUseURBQVUsR0FBRyxFQUFFLENBQUM7QUFFekIsT0FBTyxFQUFFLDhDQUE4QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXZFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFO0lBQ3hELE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQ1g7Z0JBQ0UsS0FBSztnQkFDTCxrQkFBa0IsU0FBUyxFQUFFO2dCQUM3Qix1QkFBdUIsUUFBUSxFQUFFO2dCQUNqQyx1Q0FBdUMsT0FBTyxFQUFFLENBQUMsSUFBSSxTQUFTO2dCQUM5RCwyQkFBMkI7Z0JBQzNCLElBQUk7Z0JBQ0osbUJBQW1CLFNBQVMsR0FDMUIsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDNUMsb0JBQW9CO2dCQUNwQixJQUFJO2dCQUNKLGVBQWUsVUFBVSxFQUFFO2dCQUMzQixLQUFLO2FBQ04sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9