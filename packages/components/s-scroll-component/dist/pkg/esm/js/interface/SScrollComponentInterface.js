import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name                SScrollComponentInterface
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
export default class SScrollComponentInterface extends __SInterface {
    static get _definition() {
        return {
            to: {
                description: 'The target when to scroll. Must be a valid css selector',
                type: 'String',
                required: true,
            },
            duration: {
                description: 'Specify the duration of the scroll in ms',
                type: 'number',
                default: __STheme.get('scroll.duration'),
            },
            offset: {
                description: 'Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: __STheme.get('scroll.offset'),
            },
            offsetX: {
                description: 'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: __STheme.get('scroll.offsetX'),
            },
            offsetY: {
                description: 'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: __STheme.get('scroll.offsetY'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQzNDO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxxRkFBcUY7Z0JBQ3pGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUN6QztZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMxQztZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMxQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==