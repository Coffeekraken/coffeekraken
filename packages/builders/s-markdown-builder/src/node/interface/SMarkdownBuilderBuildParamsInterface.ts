import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        input: {
            type: 'String',
            required: true,
            alias: 'i',
            default: __SSugarConfig.get('markdownBuilder.input')
        },
        output: {
            type: 'String',
            alias: 'o',
            default: __SSugarConfig.get('markdownBuilder.output')
        },
        target: {
            type: 'String',
            values: ['html','markdown'],
            alias: 't',
            default: 'markdown'
        }
    }
}