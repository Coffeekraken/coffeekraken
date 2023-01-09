import __SInterface from '@coffeekraken/s-interface';

export default class SFaviconBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            required: boolean;
            default: any;
        };
        outDir: {
            description: string;
            type: string;
            required: boolean;
            default: any;
        };
        settings: {
            description: string;
            type: string;
            default: any;
        };
    };
}
