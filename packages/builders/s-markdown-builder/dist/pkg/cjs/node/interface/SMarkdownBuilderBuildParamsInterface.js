"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMarkdownBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMarkdownBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glob pattern to target all the markdown files you want to build. This is relative the the "inDir" parameter',
                type: 'String',
                required: true,
                alias: 'g',
                default: s_sugar_config_1.default.get('markdownBuilder.default.glob'),
            },
            inDir: {
                description: 'Specify the input directory where your source files are standing',
                type: 'String',
                required: true,
                alias: 'd',
                default: s_sugar_config_1.default.get('markdownBuilder.default.inDir'),
            },
            inPath: {
                description: 'Specify a direct path to a markdown file to build',
                type: 'String',
                default: s_sugar_config_1.default.get('markdownBuilder.default.inPath'),
            },
            inRaw: {
                description: 'Specify a raw markkdown string to build',
                type: 'String',
                alias: 'r',
                default: s_sugar_config_1.default.get('markdownBuilder.default.inRaw'),
            },
            outDir: {
                description: 'Specify the directory where you want to save your builded files',
                type: 'String',
                alias: 'o',
                default: s_sugar_config_1.default.get('markdownBuilder.default.outDir'),
            },
            outPath: {
                description: 'Specify a path to the output file when you make use of the "inPath" parameter',
                type: 'String',
                default: s_sugar_config_1.default.get('markdownBuilder.default.outPath'),
            },
            data: {
                description: 'Pass some data to be used in the view',
                tyoe: 'Object',
                default: {},
            },
            save: {
                description: 'Specify if you want to save the builded files or not',
                type: 'Boolean',
                alias: 's',
                default: s_sugar_config_1.default.get('markdownBuilder.default.save'),
            },
            target: {
                description: 'Specify the target format of the build. Supported values are "html" and "markdown"',
                type: 'String',
                values: ['html', 'markdown'],
                alias: 't',
                default: s_sugar_config_1.default.get('markdownBuilder.default.target'),
            },
            preset: {
                description: 'Specify some preset(s) to use for your build. Presets are defined in the config.markdownBuilder.presets configuration path',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: Object.keys(s_sugar_config_1.default.get('markdownBuilder.presets')),
                alias: 'p',
            },
        };
    }
}
exports.default = SMarkdownBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixvQ0FBcUMsU0FBUSxxQkFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx1SEFBdUg7Z0JBQzNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQzthQUM5RDtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1Asa0VBQWtFO2dCQUN0RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDL0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUMvRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7YUFDaEU7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUNoRTtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsNEhBQTRIO2dCQUNoSSxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQ2Ysd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FDaEQ7Z0JBQ0QsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE5RUQsdURBOEVDIn0=