// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocmapInstallSnapshotParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to install snapshots
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocmapInstallSnapshotParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glob pattern where to find the snapshots to install',
                type: 'String',
                default: __SSugarConfig.get('docmap.installSnapshot.glob'),
            },
        };
    }
}
export default SDocmapInstallSnapshotParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY21hcEluc3RhbGxTbmFwc2hvdFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NtYXBJbnN0YWxsU25hcHNob3RQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7YUFDN0Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSxxQ0FBcUMsQ0FBQyJ9