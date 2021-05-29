// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __SFrontspecParamsInterface from './SFrontspecParamsInterface';
/**
 * @name                SFrontspecFindParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to search for fronspec.json file(s)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecFindParamsInterface extends __SInterface {
}
SFrontspecFindParamsInterface.definition = Object.assign(Object.assign({}, __SFrontspecParamsInterface.definition), { globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'frontspec.json files glob pattern',
        default: __SugarConfig.get('frontspec.find.globs'),
        level: 1
    }, exclude: {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching frontspecs',
        default: __SugarConfig.get('frontspec.find.exclude'),
        level: 1
    } });
export default SFrontspecFindParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY0ZpbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzcGVjRmluZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sNkJBQThCLFNBQVEsWUFBWTs7QUFDL0Msd0NBQVUsbUNBQ1osMkJBQTJCLENBQUMsVUFBVSxLQUN6QyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7UUFDbEQsS0FBSyxFQUFFLENBQUM7S0FDVCxFQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHFFQUFxRTtRQUN2RSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztRQUNwRCxLQUFLLEVBQUUsQ0FBQztLQUNULElBQ0Q7QUFFSixlQUFlLDZCQUE2QixDQUFDIn0=