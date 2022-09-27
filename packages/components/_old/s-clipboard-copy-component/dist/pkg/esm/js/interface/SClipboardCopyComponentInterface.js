import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SClipboardCopyComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SClipboardCopyComponentInterface extends __SInterface {
    static get _definition() {
        return {
            from: {
                description: 'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',
                type: 'String',
            },
            successTimeout: {
                description: 'Specify the duration for displaying the "success" icon',
                type: 'Number',
                default: 1500,
            },
            errorTimeout: {
                description: 'Specify the duration for displaying the "error" icon',
                type: 'Number',
                default: 3000,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsWUFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxrSEFBa0g7Z0JBQ3RILElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9