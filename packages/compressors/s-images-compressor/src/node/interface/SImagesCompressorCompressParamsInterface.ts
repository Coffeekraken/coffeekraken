import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        input: {
            type: 'Array<String>',
            required: true,
            default: __SSugarConfig.get('imagesCompressor.input'),
            alias: 'i'
        },
        outDir: {
            type: 'String',
            required: true,
            default: __SSugarConfig.get('imagesCompressor.outDir'),
            alias: 'o'
        },
        quality: {
            type: 'Number',
            required: true,
            default: __SSugarConfig.get('imagesCompressor.quality'),
            alias: 'q'
        },
        width: {
            type: 'Number',
            alias: 'w'
        },
        height: {
            type: 'Number',
            alias: 'h'
        },
        resolution: {
            type: 'Array<Integer>',
            default: [1],
            alias: 'r'
        },
        clear: {
            type: 'Boolean',
            default: false,
            alias: 'c'
        }
    }
}