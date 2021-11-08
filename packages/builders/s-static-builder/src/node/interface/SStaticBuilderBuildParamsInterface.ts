import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SStaticBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.input'),
            },
            outDir: {
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
            clear: {
                description:
                    'Specify if you want to clear the outDir before rebuilding',
                type: 'Boolean',
                alias: 'c',
                default: __SSugarConfig.get('staticBuilder.clear'),
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
            assets: {
                description:
                    'Specify some "assets" directories/files to copy into the static directory',
                type: 'Object',
                alias: 'a',
                default: __SSugarConfig.get('staticBuilder.assets'),
            },
            minify: {
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
        };
    }
}
