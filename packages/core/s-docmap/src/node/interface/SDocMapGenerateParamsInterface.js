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
    globs: {
        type: 'Array<String>',
        description: 'Specify some globs to use to search docblocks to use in docmap generation',
        default: __SugarConfig.get('docmap.generate.globs')
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
    noExtends: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true
        },
        description: 'Specify if you want to avoid searching for docmap.json files in the dependency packages',
        default: __SugarConfig.get('docmap.generate.noExtends'),
    },
    save: {
        type: 'Boolean',
        alias: 's',
        description: 'Specify if you want to save the generated file under the ```outPath``` path',
        default: __SugarConfig.get('docmap.generate.save')
    },
    outPath: {
        type: 'String',
        alias: 'o',
        description: 'Specify where you want to save the builded file. Usually saved in package root with the name docmap.json',
        default: __SugarConfig.get('docmap.generate.outPath')
    }
};
export default SDocMapGenerateParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sOEJBQStCLFNBQVEsWUFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1QsMkVBQTJFO1FBQzdFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO0tBQ3BEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUNyRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLGVBQWU7UUFDckIsV0FBVyxFQUNULHVFQUF1RTtRQUN6RSxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0tBQ3JEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixXQUFXLEVBQ1QsOERBQThEO1FBQ2hFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0tBQ3REO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUNwQjtRQUNELFdBQVcsRUFBRSx5RkFBeUY7UUFDdEcsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7S0FDeEQ7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULDZFQUE2RTtRQUMvRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztLQUNuRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsMEdBQTBHO1FBQ3ZILE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0tBQ3REO0NBQ0YsQ0FBQztBQUVKLGVBQWUsOEJBQThCLENBQUMifQ==