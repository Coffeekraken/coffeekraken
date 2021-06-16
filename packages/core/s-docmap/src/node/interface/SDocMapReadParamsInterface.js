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
        default: __SSugarConfig.get('docmap.build.input')
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
export default SDocMapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFJlYWRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwUmVhZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7O0FBQzVDLHFDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztLQUNsRDtJQUNELFdBQVc7SUFDWCxxQkFBcUI7SUFDckIsZ0RBQWdEO0lBQ2hELEtBQUs7SUFDTCxnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixJQUFJO0NBQ0wsQ0FBQztBQUVKLGVBQWUsMEJBQTBCLENBQUMifQ==