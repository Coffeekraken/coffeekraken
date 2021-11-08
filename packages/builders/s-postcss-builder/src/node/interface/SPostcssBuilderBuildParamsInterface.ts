import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('postcssBuilder.input'),
            },
            output: {
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('postcssBuilder.output'),
            },
            prod: {
                type: 'Boolean',
                default: false,
                alias: 'p',
            },
            minify: {
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            purge: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
