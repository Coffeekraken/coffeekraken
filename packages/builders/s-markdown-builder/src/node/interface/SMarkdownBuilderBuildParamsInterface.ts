import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        glob: {
            type: 'String',
            required: true,
            alias: 'g',
            default: __SSugarConfig.get('markdownBuilder.default.glob')
        },
        inDir: {
            type: 'String',
            required: true,
            alias: 'i',
            default: __SSugarConfig.get('markdownBuilder.default.inDir')
        },
        outDir: {
            type: 'String',
            alias: 'o',
            default: __SSugarConfig.get('markdownBuilder.default.outDir')
        },
        save: {
            type: 'Boolean',
            alias: 's',
            default: __SSugarConfig.get('markdownBuilder.default.save')
        },
        target: {
            type: 'String',
            values: ['html','markdown'],
            alias: 't',
            default: __SSugarConfig.get('markdownBuilder.default.target')
        },
        preset: {
            type: 'Array<String>',
            values: Object.keys(__SSugarConfig.get('markdownBuilder.presets')),
            alias: 'p'
        }
    }
}