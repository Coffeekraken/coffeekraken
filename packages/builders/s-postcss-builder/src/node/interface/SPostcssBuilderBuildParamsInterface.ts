import __SEnv from '@coffeekraken/s-env';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPostcssBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SPostcssBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input css file for your build',
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('postcssBuilder.input'),
            },
            output: {
                description:
                    'Specify the output file path you want to save your build',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('postcssBuilder.output'),
            },
            target: {
                description:
                    'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: __SEnv.get('target') ?? 'development',
            },
            minify: {
                description: 'Specify if you want to minify your output css',
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            purge: {
                description:
                    'Specify if you want to purge your output css. See the config.purgecss configuration file for more control',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
