import __SInterface from '@coffeekraken/s-interface';

export default class SSitemapBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        source: {
            description: string;
            type: string;
            default: any[];
        };
        sourcesSettings: {
            description: string;
            type: string;
            default: {};
        };
        output: {
            description: string;
            type: string;
            default: any;
        };
        save: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
