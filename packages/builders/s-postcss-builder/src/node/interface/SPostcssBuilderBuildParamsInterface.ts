import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        input: {
            type: 'String',
            required: true,
            alias: 'i',
            default: __SSugarConfig.get('postcss.input')
        },
        output: {
            type: 'String',
            alias: 'o'
        },
        purge: {
            type: 'Boolean',
            alias: 'p'
        }
    }
}