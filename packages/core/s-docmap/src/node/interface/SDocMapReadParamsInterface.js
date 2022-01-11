// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocMapReadParamsInterface
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapReadParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input path to the docmap.json file to read',
                type: 'String',
                default: __SSugarConfig.get('docmap.read.input'),
                alias: 'i',
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
export default SDocMapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFJlYWRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwUmVhZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7SUFDakQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGNBQWM7WUFDZCxzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLEtBQUs7WUFDTCxpQkFBaUI7WUFDakIsc0JBQXNCO1lBQ3RCLGNBQWM7WUFDZCwwQkFBMEI7WUFDMUIsd0JBQXdCO1lBQ3hCLFNBQVM7WUFDVCw2REFBNkQ7WUFDN0QsS0FBSztTQUNSLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLDBCQUEwQixDQUFDIn0=