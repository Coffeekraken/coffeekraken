// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocMapBuildParamsInterface
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
class SDocMapBuildParamsInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            globs: {
                type: 'Array<String>',
                description: 'Specify some globs to use to search docblocks to use in docmap generation',
                default: __SugarConfig.get('docmap.build.globs'),
            },
            exclude: {
                type: 'Array<String>',
                description: 'Specify some regexp used to exclude files from resulting docMap',
                default: __SugarConfig.get('docmap.build.exclude'),
                level: 1,
            },
            fields: {
                type: 'Array<String>',
                description: 'Specify which docblock fields you want in your final docmap.json file',
                alias: 'f',
                default: __SugarConfig.get('docmap.build.fields'),
            },
            filters: {
                type: 'Object<RegExp>',
                description: 'Specify some properties and regex to use to filter docblocks',
                default: __SugarConfig.get('docmap.build.filters'),
            },
            noExtends: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                description: 'Specify if you want to avoid searching for docmap.json files in the dependency packages',
                default: __SugarConfig.get('docmap.build.noExtends'),
            },
            save: {
                type: 'Boolean',
                alias: 's',
                description: 'Specify if you want to save the generated file under the ```outPath``` path',
                default: __SugarConfig.get('docmap.build.save'),
            },
            outPath: {
                type: 'String',
                alias: 'o',
                description: 'Specify where you want to save the builded file. Usually saved in package root with the name docmap.json',
                default: __SugarConfig.get('docmap.build.outPath'),
            },
        }));
    }
}
export default SDocMapBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcEJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sMkJBQTRCLFNBQVEsWUFBWTtJQUNsRCxNQUFNLEtBQUssVUFBVTs7UUFDakIsT0FBTyxDQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3BEO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3JEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsV0FBVyxFQUNQLHlGQUF5RjtnQkFDN0YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDdkQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDbEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDBHQUEwRztnQkFDOUcsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDckQ7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsMkJBQTJCLENBQUMifQ==