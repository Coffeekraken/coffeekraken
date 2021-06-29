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
        default: __SSugarConfig.get('docmap.read.input')
    },
    collect: {
        type: 'Array<String>',
        default: __SSugarConfig.get('docmap.read.collect')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFJlYWRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwUmVhZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7O0FBQzVDLHFDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztLQUNqRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0tBQ25EO0lBQ0QsV0FBVztJQUNYLHFCQUFxQjtJQUNyQixnREFBZ0Q7SUFDaEQsS0FBSztJQUNMLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLElBQUk7Q0FDTCxDQUFDO0FBRUosZUFBZSwwQkFBMEIsQ0FBQyJ9