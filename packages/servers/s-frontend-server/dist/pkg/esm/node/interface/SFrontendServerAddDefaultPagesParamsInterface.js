// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontendServerAddDefaultPagesParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server adding default pages process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerAddDefaultPagesParamsIn extends __SInterface {
    static get _definition() {
        return {
            yes: {
                description: 'Answer yes to all the potential questions',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.pagesDir'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQ0FBdUMsU0FBUSxZQUFZO0lBQzVFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==