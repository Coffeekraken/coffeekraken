// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocMapGenerateParamsInterface
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
class SDocMapGenerateParamsInterface extends __SInterface {
}
SDocMapGenerateParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: __sugarConfig('docmap.cache'),
        level: 1
    },
    globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: __sugarConfig('docmap.generate.globs'),
        level: 1
    },
    exclude: {
        type: 'Array<String>',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: __sugarConfig('docmap.generate.exclude'),
        level: 1
    },
    fields: {
        type: 'Array<String>',
        description: 'Specify which docblock fields you want in your final docmap.json file',
        alias: 'f',
        default: __sugarConfig('docmap.generate.fields')
    },
    filters: {
        type: 'Object<RegExp>',
        description: 'Specify some properties and regex to use to filter docblocks',
        default: __sugarConfig('docmap.generate.filters')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        description: 'Specify if you want to watch the sources files to re-generate the docmap.json automatically on updates',
        default: __sugarConfig('docmap.generate.watch')
    },
    outPath: {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: __sugarConfig('docmap.generate.outPath'),
        level: 1
    },
    save: {
        type: 'Boolean',
        alias: 's',
        description: 'Specify if you want to save the generated file under the ```outPath``` path',
        default: __sugarConfig('docmap.generate.save')
    }
};
export default SDocMapGenerateParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3RDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsT0FBTyxFQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztRQUMvQyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxPQUFPLEVBQUUsYUFBYSxDQUFDLHlCQUF5QixDQUFDO1FBQ2pELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1QsdUVBQXVFO1FBQ3pFLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztLQUNqRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsV0FBVyxFQUNULDhEQUE4RDtRQUNoRSxPQUFPLEVBQUUsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0tBQ2xEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCx3R0FBd0c7UUFDMUcsT0FBTyxFQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLE9BQU8sRUFBRSxhQUFhLENBQUMseUJBQXlCLENBQUM7UUFDakQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsNkVBQTZFO1FBQy9FLE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7Q0FDRixDQUFDO0FBRUosZUFBZSw4QkFBOEIsQ0FBQyJ9