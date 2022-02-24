import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SStaticBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SStaticBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SStaticBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the path to the input sitemap.xml file',
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.input'),
            },
            outDir: {
                description: 'Specify the path to the output folder',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('staticBuilder.outDir'),
            },
            host: {
                description: 'Specify the host on which to make the requests',
                type: 'String',
                alias: 'h',
                default: __SSugarConfig.get('staticBuilder.host'),
            },
            clean: {
                description:
                    'Specify if you want to clean the past builds before rebuilding. THis would do the same as setting the "incremental" option to false',
                type: 'Boolean',
                alias: 'c',
                default: __SSugarConfig.get('staticBuilder.clean'),
            },
            incremental: {
                description: 'Specify if you want to use incremental build',
                type: 'Boolean',
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.incremental'),
            },
            failAfter: {
                description:
                    'Specify the number of authorized fails before stopping the process',
                type: 'Number',
                alias: 'f',
                default: __SSugarConfig.get('staticBuilder.failAfter'),
            },
            requestTimeout: {
                description:
                    'Specify after how many ms a request has to be considered as failed',
                type: 'Number',
                alias: 't',
                default: __SSugarConfig.get('staticBuilder.requestTimeout'),
            },
            requestRetry: {
                description: 'Specify the number of retry to do by request before considering it as failed',
                type: 'Number',
                default: __SSugarConfig.get('staticBuilder.requestRetry')
            },
            requestRetryTimeout: {
                description: 'Specify how many long the builder has to wait between tries',
                type: 'Number',
                default: __SSugarConfig.get('staticBuilder.requestRetryTimeout')
            },
            assets: {
                description:
                    'Specify some "assets" directories/files to copy into the static directory',
                type: 'Object',
                alias: 'a',
                default: __SSugarConfig.get('staticBuilder.assets'),
            },
            minify: {
                description: 'Specify if you want to minify the output or not',
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            prod: {
                description: 'Shorthand to set a production ready build',
                type: 'Boolean',
                default: false,
                alias: 'p',
            },
        };
    }
}
