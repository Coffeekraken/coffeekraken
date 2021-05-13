// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __SDocMapParamsInterface from './SDocMapParamsInterface';
/**
 * @name                SDocMapSettingsInterface
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
class SDocMapSettingsInterface extends __SInterface {
}
SDocMapSettingsInterface.definition = Object.assign(Object.assign({}, __SDocMapParamsInterface.definition), { globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'docMap.json files glob pattern',
        default: __sugarConfig('docmap.find.globs'),
        level: 1
    }, exclude: {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching docMaps',
        default: __sugarConfig('docmap.find.exclude'),
        level: 1
    } });
export default SDocMapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEZpbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwRmluZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyx3QkFBd0IsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sd0JBQXlCLFNBQVEsWUFBWTs7QUFDMUMsbUNBQVUsbUNBQ1osd0JBQXdCLENBQUMsVUFBVSxLQUN0QyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsT0FBTyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzQyxLQUFLLEVBQUUsQ0FBQztLQUNULEVBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1Qsa0VBQWtFO1FBQ3BFLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUM7S0FDVCxJQUNEO0FBRUosZUFBZSx3QkFBd0IsQ0FBQyJ9