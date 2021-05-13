// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
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
        default: __sugarConfig('frontspec.find.globs'),
        level: 1
    }, exclude: {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching frontspecs',
        default: __sugarConfig('frontspec.find.exclude'),
        level: 1
    } });
export default SFrontspecFindParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY0ZpbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzcGVjRmluZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sNkJBQThCLFNBQVEsWUFBWTs7QUFDL0Msd0NBQVUsbUNBQ1osMkJBQTJCLENBQUMsVUFBVSxLQUN6QyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUM5QyxLQUFLLEVBQUUsQ0FBQztLQUNULEVBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QscUVBQXFFO1FBQ3ZFLE9BQU8sRUFBRSxhQUFhLENBQUMsd0JBQXdCLENBQUM7UUFDaEQsS0FBSyxFQUFFLENBQUM7S0FDVCxJQUNEO0FBRUosZUFBZSw2QkFBNkIsQ0FBQyJ9