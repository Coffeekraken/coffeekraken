import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginComponentsClassesInterface extends __SInterface {
}
postcssSugarPluginComponentsClassesInterface.definition = {};
export { postcssSugarPluginComponentsClassesInterface as interface };
/**
 * @name           classes
 * @namespace      mixins.components
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes for listed in the theme config components
 *
 * @example         postcss
 * \@sugar.components.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [];
    const componentsObj = __theme().config('components');
    Object.keys(componentsObj).forEach(selector => {
        cssArray.push(`
            ${selector} {
                @sugar.utils.configToCss(components.${selector});
            }
        `);
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Y0FDUixRQUFRO3NEQUNnQyxRQUFROztTQUVyRCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVMLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QixDQUFDIn0=