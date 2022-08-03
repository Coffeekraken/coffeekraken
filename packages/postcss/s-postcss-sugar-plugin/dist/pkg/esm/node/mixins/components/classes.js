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
 * @namespace      node.mixin.component
 * @type           PostcssMixin
 * @platform        postcss
 * @status        beta
 *
 * This mixin allows you to print all the ui classes for listed in the theme config components
 *
 * @example        css
 * \@sugar.components.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'vr', 'tf'] }, params);
    const vars = [];
    const componentsObj = __STheme.get('components');
    Object.keys(componentsObj).forEach((selector) => {
        var _a;
        if (finalParams.scope.indexOf('bare') !== -1) {
            vars.push(`
          ${selector} {
            ${__STheme.jsObjectToCssProperties(componentsObj[selector], {
                exclude: ['rhythmVertical'],
            })}
          }
        `);
        }
        if (finalParams.scope.indexOf('vr') !== -1) {
            vars.push(`
          @sugar.rhythm.vertical {
            ${selector} {
              ${__STheme.jsObjectToCssProperties((_a = componentsObj[selector].rhythmVertical) !== null && _a !== void 0 ? _a : {})}
            }
          }
        `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDdkM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFDL0IsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVqRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUM1QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDVixRQUFRO2NBQ04sUUFBUSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDOUIsQ0FBQzs7U0FFTCxDQUFDLENBQUM7U0FDRjtRQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Y0FFUixRQUFRO2dCQUNOLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsTUFBQSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQy9DOzs7U0FHTixDQUFDLENBQUM7U0FDRjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==