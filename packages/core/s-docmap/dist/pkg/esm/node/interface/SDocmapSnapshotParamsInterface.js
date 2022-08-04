// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocmapSnapshotParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to make a docmap snapshot
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocMapSnapshotParamsInterface extends __SInterface {
    static get _definition() {
        return {
            outDir: {
                description: 'Specify the directory path where to store your snapshots',
                type: 'String',
                path: {
                    absolute: true,
                    tokens: true,
                },
                default: __SSugarConfig.get('docmap.snapshot.outDir'),
            },
        };
    }
}
export default SDocMapSnapshotParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRTtvQkFDRixRQUFRLEVBQUUsSUFBSTtvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUN4RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLDhCQUE4QixDQUFDIn0=