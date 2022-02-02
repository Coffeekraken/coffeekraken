import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SMarkdownBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SMarkdownBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glob pattern to target all the markdown files you want to build. This is relative the the "inDir" parameter',
                type: 'String',
                required: true,
                alias: 'g',
                default: __SSugarConfig.get('markdownBuilder.default.glob'),
            },
            inDir: {
                description: 'Specify the input directory where your source files are standing',
                type: 'String',
                required: true,
                alias: 'd',
                default: __SSugarConfig.get('markdownBuilder.default.inDir'),
            },
            inPath: {
                description: 'Specify a direct path to a markdown file to build',
                type: 'String',
                alias: 'p',
                default: __SSugarConfig.get('markdownBuilder.default.inPath'),
            },
            inRaw: {
                description: 'Specify a raw markkdown string to build',
                type: 'String',
                alias: 'r',
                default: __SSugarConfig.get('markdownBuilder.default.inRaw'),
            },
            outDir: {
                description: 'Specify the directory where you want to save your builded files',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('markdownBuilder.default.outDir'),
            },
            outPath: {
                description: 'Specify a path to the output file when you make use of the "inPath" parameter',
                type: 'String',
                default: __SSugarConfig.get('markdownBuilder.default.outPath'),
            },
            save: {
                description: 'Specify if you want to save the builded files or not',
                type: 'Boolean',
                alias: 's',
                default: __SSugarConfig.get('markdownBuilder.default.save'),
            },
            target: {
                description: 'Specify the target format of the build. Supported values are "html" and "markdown"',
                type: 'String',
                values: ['html', 'markdown'],
                alias: 't',
                default: __SSugarConfig.get('markdownBuilder.default.target'),
            },
            preset: {
                description: 'Specify some preset(s) to use for your build. Presets are defined in the config.markdownBuilder.presets configuration path',
                type: 'Array<String>',
                values: Object.keys(__SSugarConfig.get('markdownBuilder.presets')),
                alias: 'p',
            },
            protectedTags: {
                description: 'Specify some tags that should be protected from the markdown transformations like "template" or "code"...',
                type: 'Array<String>',
                default: __SSugarConfig.get('markdownBuilder.default.protectedTags')
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0NBQXFDLFNBQVEsWUFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx1SEFBdUg7Z0JBQzNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQy9EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQy9EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw0SEFBNEg7Z0JBQ2hJLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FDZixjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQ2hEO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLDJHQUEyRztnQkFDeEgsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDO2FBQ3ZFO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9