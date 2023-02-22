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
            excludeByTags: {
                type: 'Object',
                description: 'Specify some tags and regex to use to filter out docblocks. Docblock items that have a tag that match one of his regex will be cutted out',
                default: __SSugarConfig.get('docmap.build.excludeByTags'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sMkJBQTRCLFNBQVEsWUFBWTtJQUNsRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ25EO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwySUFBMkk7Z0JBQy9JLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ25EO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCwwR0FBMEc7Z0JBQzlHLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsMkJBQTJCLENBQUMifQ==