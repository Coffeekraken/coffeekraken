import __SInterface from '@coffeekraken/s-interface';

export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            required: boolean;
            alias: string;
            default: any;
        };
        output: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        prod: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        minify: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        purge: {
            description: string;
            type: string;
            default: boolean;
        };
        saveDev: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
