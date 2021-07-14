// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocMapSnapshotParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to make a docmap snapshot
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapSnapshotParamsInterface extends __SInterface {
}
SDocMapSnapshotParamsInterface.definition = {
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            tokens: true
        },
        default: __SSugarConfig.get('docmap.snapshot.outDir')
    }
};
export default SDocMapSnapshotParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY21hcFNuYXBzaG90UGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY21hcFNuYXBzaG90UGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0tBQ3hEO0NBQ0YsQ0FBQztBQUVKLGVBQWUsOEJBQThCLENBQUMifQ==