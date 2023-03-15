import __SFrontspec from '@coffeekraken/s-frontspec';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSpacesSelectorComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSpacesSelectorComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSpacesSelectorComponentInterface extends __SInterface {
    static get _definition() {
        return {
            spaces: {
                type: 'Object',
                description: 'Specify the spaces you want as options. This object MUST contain two properties which are "margin" and "padding", which contains each every options you want as an object with "name" and "value" properties',
                required: true,
                get default() {
                    var _a, _b;
                    return {
                        margin: (_a = __SFrontspec.get('margin')) !== null && _a !== void 0 ? _a : {},
                        padding: (_b = __SFrontspec.get('padding')) !== null && _b !== void 0 ? _b : {},
                    };
                },
            },
            values: {
                type: 'Object',
                description: 'Specify the initial values for the selectors. MUST be an object with properties "paddingTop", "paddingLeft", "marginBottom", etc...',
                default: {},
            },
            valueProp: {
                type: 'String',
                description: 'Specify the space object propery to take as value',
                default: 'value',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCw4TUFBOE07Z0JBQ2xOLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksT0FBTzs7b0JBQ1AsT0FBTzt3QkFDSCxNQUFNLEVBQUUsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFO3dCQUN4QyxPQUFPLEVBQUUsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFO3FCQUM3QyxDQUFDO2dCQUNOLENBQUM7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AscUlBQXFJO2dCQUN6SSxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9