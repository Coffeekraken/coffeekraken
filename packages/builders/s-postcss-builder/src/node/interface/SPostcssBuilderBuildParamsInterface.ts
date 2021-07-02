import __SInterface from '@coffeekraken/s-interface';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static definition = {
        input: {
            type: 'String',
            required: true,
            alias: 'i'
        },
        output: {
            type: 'String',
            required: true,
            alias: 'o'
        }
    }
}