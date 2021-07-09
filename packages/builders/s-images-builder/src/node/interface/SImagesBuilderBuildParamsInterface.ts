import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        glob: {
            type: 'String',
            required: true,
            default: __SSugarConfig.get('imagesBuilder.glob'),
            alias: 'g'
        },
        inDir: {
            type: 'String',
            required: true,
            default: __SSugarConfig.get('imagesBuilder.inDir'),
            alias: 'i'
        },
        outDir: {
            type: 'String',
            required: true,
            default: __SSugarConfig.get('imagesBuilder.outDir'),
            alias: 'o'
        },
        quality: {
            type: 'Number',
            required: true,
            default: __SSugarConfig.get('imagesBuilder.quality'),
            alias: 'q'
        },
        webp: {
            type: 'Boolean',
            default: __SSugarConfig.get('imagesBuilder.webp')
        },
        width: {
            type: 'Number',
            default: __SSugarConfig.get('imagesBuilder.width'),
            alias: 'w'
        },
        height: {
            type: 'Number',
            default: __SSugarConfig.get('imagesBuilder.height'),
            alias: 'h'
        },
        resolution: {
            type: 'Array<Integer>',
            default: __SSugarConfig.get('imagesBuilder.resolution'),
            alias: 'r'
        },
        clear: {
            type: 'Boolean',
            default: __SSugarConfig.get('imagesBuilder.clear'),
            alias: 'c'
        },
        specificParams: {
            type: 'Object',
            default: __SSugarConfig.get('imagesBuilder.specificParams')
        }
    }
}