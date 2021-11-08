// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocMapReadParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
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
                type: 'String',
                default: __SSugarConfig.get('docmap.read.input'),
                alias: 'i',
            },
            snapshot: {
                type: 'String',
                alias: 's',
            },
            snapshotDir: {
                type: 'String',
                path: {
                    absolute: true,
                    tokens: true,
                },
                default: __SSugarConfig.get('docmap.snapshot.outDir'),
            },
            // cache: {
            //   type: 'Boolean',
            //   default: __SSugarConfig.get('docmap.cache')
            // },
            // clearCache: {
            //   type: 'Boolean',
            //   default: false
            // }
        };
    }
}
export default SDocMapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFJlYWRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwUmVhZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7SUFDakQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRTtvQkFDRixRQUFRLEVBQUUsSUFBSTtvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUN4RDtZQUNELFdBQVc7WUFDWCxxQkFBcUI7WUFDckIsZ0RBQWdEO1lBQ2hELEtBQUs7WUFDTCxnQkFBZ0I7WUFDaEIscUJBQXFCO1lBQ3JCLG1CQUFtQjtZQUNuQixJQUFJO1NBQ1AsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsMEJBQTBCLENBQUMifQ==