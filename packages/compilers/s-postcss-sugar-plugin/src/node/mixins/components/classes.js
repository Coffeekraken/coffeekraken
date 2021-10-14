import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
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
export default function ({ params, atRule, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'vr', 'tf'] }, params);
    const cssArray = [];
    const componentsObj = __theme().config('components');
    Object.keys(componentsObj).forEach((selector) => {
        var _a;
        if (finalParams.scope.indexOf('bare') !== -1) {
            cssArray.push(`
          ${selector} {
            ${jsObjectToCssProperties(componentsObj[selector], {
                exclude: ['rhythmVertical'],
            })}
          }
        `);
        }
        if (finalParams.scope.indexOf('vr') !== -1) {
            cssArray.push(`
          @sugar.rhythm.vertical {
            ${selector} {
              ${jsObjectToCssProperties((_a = componentsObj[selector].rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
          }
        `);
        }
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQ3ZDO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLHVCQUF1QixFQUN2QixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQy9CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLE1BQU0sYUFBYSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUM1QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZCxRQUFRO2NBQ04sdUJBQXVCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMvQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5QixDQUFDOztTQUVMLENBQUMsQ0FBQztTQUNGO1FBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDOztjQUVaLFFBQVE7Z0JBQ04sdUJBQXVCLENBQ3JCLE1BQUEsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUMvQzs7O1NBR04sQ0FBQyxDQUFDO1NBQ0Y7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=