// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
        default: __SugarConfig.get('docmap.cache'),
        level: 1
    },
    globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: __SugarConfig.get('docmap.generate.globs'),
        level: 1
    },
    exclude: {
        type: 'Array<String>',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: __SugarConfig.get('docmap.generate.exclude'),
        level: 1
    },
    fields: {
        type: 'Array<String>',
        description: 'Specify which docblock fields you want in your final docmap.json file',
        alias: 'f',
        default: __SugarConfig.get('docmap.generate.fields')
    },
    filters: {
        type: 'Object<RegExp>',
        description: 'Specify some properties and regex to use to filter docblocks',
        default: __SugarConfig.get('docmap.generate.filters')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        description: 'Specify if you want to watch the sources files to re-generate the docmap.json automatically on updates',
        default: __SugarConfig.get('docmap.generate.watch')
    },
    outPath: {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: __SugarConfig.get('docmap.generate.outPath'),
        level: 1
    },
    save: {
        type: 'Boolean',
        alias: 's',
        description: 'Specify if you want to save the generated file under the ```outPath``` path',
        default: __SugarConfig.get('docmap.generate.save')
    }
};
export default SDocMapGenerateParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO1FBQ25ELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1QsaUVBQWlFO1FBQ25FLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQ3JELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1QsdUVBQXVFO1FBQ3pFLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7S0FDckQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDVCw4REFBOEQ7UUFDaEUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7S0FDdEQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULHdHQUF3RztRQUMxRyxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUNwRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQ3JELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULDZFQUE2RTtRQUMvRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztLQUNuRDtDQUNGLENBQUM7QUFFSixlQUFlLDhCQUE4QixDQUFDIn0=