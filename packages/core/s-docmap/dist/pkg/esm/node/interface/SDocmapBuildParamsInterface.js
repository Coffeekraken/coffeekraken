// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SDocmapBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
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
                default: __SSugarConfig.get('docmap.build.globs'),
            },
            exclude: {
                type: 'Array<String>',
                description: 'Specify some regexp used to exclude files from resulting docMap',
                default: __SSugarConfig.get('docmap.build.exclude'),
                level: 1,
            },
            tags: {
                type: 'Array<String>',
                description: 'Specify which docblock tags you want in your final docmap.json file',
                alias: 'f',
                default: __SSugarConfig.get('docmap.build.tags'),
            },
            filters: {
                type: 'Object<RegExp>',
                description: 'Specify some properties and regex to use to filter docblocks',
                default: __SSugarConfig.get('docmap.build.filters'),
            },
            noExtends: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                description: 'Specify if you want to avoid searching for docmap.json files in the dependency packages',
                default: __SSugarConfig.get('docmap.noExtends'),
            },
            excludePackages: {
                type: {
                    type: 'String[]',
                    splitChars: [' ', ','],
                },
                description: 'Specify some package(s) name(s) (glob) to exclude',
                default: __SSugarConfig.get('docmap.excludePackages'),
            },
            save: {
                type: 'Boolean',
                alias: 's',
                description: 'Specify if you want to save the generated file under the ```outPath``` path',
                default: __SSugarConfig.get('docmap.build.save'),
            },
            outPath: {
                type: 'String',
                alias: 'o',
                description: 'Specify where you want to save the builded file. Usually saved in package root with the name docmap.json',
                default: __SSugarConfig.get('docmap.build.outPath'),
            },
        };
    }
}
export default SDocmapBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sMkJBQTRCLFNBQVEsWUFBWTtJQUNsRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ25EO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsV0FBVyxFQUNQLHlGQUF5RjtnQkFDN0YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDbEQ7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUN4RDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsNkVBQTZFO2dCQUNqRixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsMEdBQTBHO2dCQUM5RyxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLDJCQUEyQixDQUFDIn0=