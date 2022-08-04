// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SDocmapReadParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapReadParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input path to the docmap.json file to read',
                type: 'String',
                default: __SSugarConfig.get('docmap.read.input'),
                alias: 'i',
            },
            sort: {
                description: 'Specify which of the docmap entries has to be sorted alphabetically.',
                type: 'String[]',
                default: __SSugarConfig.get('docmap.read.sort'),
            },
            sortDeep: {
                description: 'Specify which of the docmap entries has to be sorted alphabetically AND deeply.',
                type: 'String[]',
                default: __SSugarConfig.get('docmap.read.sortDeep'),
            },
            // snapshot: {
            //     type: 'String',
            //     alias: 's',
            // },
            // snapshotDir: {
            //     type: 'String',
            //     path: {
            //         absolute: true,
            //         tokens: true,
            //     },
            //     default: __SSugarConfig.get('docmap.snapshot.outDir'),
            // },
        };
    }
}
export default SDocmapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsWUFBWTtJQUNqRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2dCQUNoRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUNsRDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1AsaUZBQWlGO2dCQUNyRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7WUFDRCxjQUFjO1lBQ2Qsc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQixLQUFLO1lBQ0wsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUN0QixjQUFjO1lBQ2QsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4QixTQUFTO1lBQ1QsNkRBQTZEO1lBQzdELEtBQUs7U0FDUixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSwwQkFBMEIsQ0FBQyJ9