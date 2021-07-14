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
}
SDocMapReadParamsInterface.definition = {
    input: {
        type: 'String',
        default: __SSugarConfig.get('docmap.read.input'),
        alias: 'i'
    },
    snapshot: {
        type: 'String',
        alias: 's'
    },
    snapshotDir: {
        type: 'String',
        path: {
            absolute: true,
            tokens: true
        },
        default: __SSugarConfig.get('docmap.snapshot.outDir')
    }
    // cache: {
    //   type: 'Boolean',
    //   default: __SSugarConfig.get('docmap.cache')
    // },
    // clearCache: {
    //   type: 'Boolean',
    //   default: false
    // }
};
export default SDocMapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFJlYWRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwUmVhZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7O0FBQzVDLHFDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUNoRCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztLQUN0RDtJQUNELFdBQVc7SUFDWCxxQkFBcUI7SUFDckIsZ0RBQWdEO0lBQ2hELEtBQUs7SUFDTCxnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixJQUFJO0NBQ0wsQ0FBQztBQUVKLGVBQWUsMEJBQTBCLENBQUMifQ==