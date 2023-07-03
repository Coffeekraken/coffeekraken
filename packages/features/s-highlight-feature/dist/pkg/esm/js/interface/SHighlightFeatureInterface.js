import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SHighlightFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SHighlight feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SHighlightFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                description: 'Specify the type of highlight you want',
                default: 'light',
                physical: true,
            },
            size: {
                type: 'Number',
                description: 'Specify the size of the highlight in px',
            },
            intensity: {
                type: 'Number',
                description: 'Specify the intensity of the highlight beetween 0 and 1',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELE9BQU8sRUFBRSxPQUFPO2dCQUNoQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUseUNBQXlDO2FBQ3pEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx5REFBeUQ7YUFDaEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=