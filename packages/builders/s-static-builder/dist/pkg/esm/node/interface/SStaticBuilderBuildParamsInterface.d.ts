import __SInterface from '@coffeekraken/s-interface';

export default class SStaticBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            required: boolean;
            alias: string;
            default: any;
        };
        outDir: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        host: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        fromErrors: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        useFrontendServer: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        clean: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        incremental: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        failAfter: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        requestTimeout: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        requestRetry: {
            description: string;
            type: string;
            default: any;
        };
        requestRetryTimeout: {
            description: string;
            type: string;
            default: any;
        };
        assets: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        minify: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        target: {
            description: string;
            values: string[];
            alias: string;
            default: any;
        };
    };
}
