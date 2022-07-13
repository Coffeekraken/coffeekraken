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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Specify a glob pattern to target all the markdown files you want to build. This is relative the the "inDir" parameter',
                type: 'String',
                required: true,
                alias: 'g',
                default: __SSugarConfig.get('markdownBuilder.default.glob'),
            },
            inDir: {
                description:
                    'Specify the input directory where your source files are standing',
                type: 'String',
                required: true,
                alias: 'd',
                default: __SSugarConfig.get('markdownBuilder.default.inDir'),
            },
            inPath: {
                description:
                    'Specify a direct path to a markdown file to build',
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
                description:
                    'Specify the directory where you want to save your builded files',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('markdownBuilder.default.outDir'),
            },
            outPath: {
                description:
                    'Specify a path to the output file when you make use of the "inPath" parameter',
                type: 'String',
                default: __SSugarConfig.get('markdownBuilder.default.outPath'),
            },
            data: {
                description: 'Pass some data to be used in the view',
                tyoe: 'Object',
                default: {}
            },
            save: {
                description:
                    'Specify if you want to save the builded files or not',
                type: 'Boolean',
                alias: 's',
                default: __SSugarConfig.get('markdownBuilder.default.save'),
            },
            target: {
                description:
                    'Specify the target format of the build. Supported values are "html" and "markdown"',
                type: 'String',
                values: ['html', 'markdown'],
                alias: 't',
                default: __SSugarConfig.get('markdownBuilder.default.target'),
            },
            preset: {
                description:
                    'Specify some preset(s) to use for your build. Presets are defined in the config.markdownBuilder.presets configuration path',
                type: 'Array<String>',
                values: Object.keys(
                    __SSugarConfig.get('markdownBuilder.presets'),
                ),
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
