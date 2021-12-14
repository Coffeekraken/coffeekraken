import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginComponentsClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginComponentsClassesInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.components
 * @type           PostcssMixin
 * @platform        postcss
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN2QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUMvQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7O1FBQzVDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNkLFFBQVE7Y0FDTixRQUFRLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5QixDQUFDOztTQUVMLENBQUMsQ0FBQztTQUNGO1FBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDOztjQUVaLFFBQVE7Z0JBQ04sUUFBUSxDQUFDLHVCQUF1QixDQUM5QixNQUFBLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLG1DQUFJLEVBQUUsQ0FDL0M7OztTQUdOLENBQUMsQ0FBQztTQUNGO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9