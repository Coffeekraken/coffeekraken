// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocmapBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
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
            tags: {
                type: 'Array<String>',
                description: 'Specify which docblock tags you want in your final docmap.json file',
                alias: 'f',
                default: __SugarConfig.get('docmap.build.tags'),
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
        };
    }
}
export default SDocmapBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY21hcEJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY21hcEJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sMkJBQTRCLFNBQVEsWUFBWTtJQUNsRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3JEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsV0FBVyxFQUNQLHlGQUF5RjtnQkFDN0YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDdkQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDbEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDBHQUEwRztnQkFDOUcsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDckQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSwyQkFBMkIsQ0FBQyJ9