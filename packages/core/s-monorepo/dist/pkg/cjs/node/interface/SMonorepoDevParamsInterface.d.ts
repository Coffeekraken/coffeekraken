import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoDevParamsInterface extends __SInterface {
    static get _definition(): {
        packagesGlob: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        build: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        buildInitial: {
            description: string;
            type: string;
            default: boolean;
        };
        test: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        testInitial: {
            description: string;
            type: string;
            default: boolean;
        };
        format: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        formatInitial: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
