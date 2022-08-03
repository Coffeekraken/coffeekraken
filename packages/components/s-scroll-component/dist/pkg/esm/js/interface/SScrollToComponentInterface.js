import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SScrollToComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SScrollToComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SScrollToComponentInterface extends __SInterface {
    static get _definition() {
        return {
            duration: {
                description: 'Specify the duration of the scroll in ms',
                type: 'number',
                default: 300,
            },
            offset: {
                description: 'Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetX: {
                description: 'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetY: {
                description: 'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHFGQUFxRjtnQkFDekYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=