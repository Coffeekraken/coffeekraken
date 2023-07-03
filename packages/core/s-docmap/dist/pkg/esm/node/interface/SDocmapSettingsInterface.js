// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocmapSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe SDocmap settings
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            customMenu: {
                description: 'Specify some custom menu to generate for the docmap.',
                type: 'Object',
                default: {},
            },
            tagsProxy: {
                description: 'Specify some proxy by tags. A proxy is a function that will be called with the corresponding tag data and return new data for the docmap.json file.',
                type: 'Object',
                default: {},
            },
        };
    }
}
export default SDocmapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSx3QkFBeUIsU0FBUSxZQUFZO0lBQy9DLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AscUpBQXFKO2dCQUN6SixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsd0JBQXdCLENBQUMifQ==