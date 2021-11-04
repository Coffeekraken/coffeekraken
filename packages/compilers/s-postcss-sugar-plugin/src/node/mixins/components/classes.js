import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginComponentsClassesInterface extends __SInterface {
}
postcssSugarPluginComponentsClassesInterface.definition = {
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'vr', 'tf'],
        default: ['bare', 'lnf', 'vr', 'tf'],
    },
};
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
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'vr', 'tf'] }, params);
    const cssArray = [];
    const componentsObj = __STheme.config('components');
    Object.keys(componentsObj).forEach((selector) => {
        var _a;
        if (finalParams.scope.indexOf('bare') !== -1) {
            cssArray.push(`
          ${selector} {
            ${__STheme.jsObjectToCssProperties(componentsObj[selector], {
                exclude: ['rhythmVertical'],
            })}
          }
        `);
        }
        if (finalParams.scope.indexOf('vr') !== -1) {
            cssArray.push(`
          @sugar.rhythm.vertical {
            ${selector} {
              ${__STheme.jsObjectToCssProperties((_a = componentsObj[selector].rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
          }
        `);
        }
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQ3ZDO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFDL0IsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVwRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUM1QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZCxRQUFRO2NBQ04sUUFBUSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDOUIsQ0FBQzs7U0FFTCxDQUFDLENBQUM7U0FDRjtRQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQzs7Y0FFWixRQUFRO2dCQUNOLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsTUFBQSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQy9DOzs7U0FHTixDQUFDLENBQUM7U0FDRjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==