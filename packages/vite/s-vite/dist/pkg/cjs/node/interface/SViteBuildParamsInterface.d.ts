import __SInterface from '@coffeekraken/s-interface';

declare class SViteBuildParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            path: {
                exists: boolean;
                absolute: boolean;
            };
            default: string;
            required: boolean;
        };
        type: {
            description: string;
            type: string;
            values: string[];
            default: string[];
            alias: string;
        };
        format: {
            description: string;
            type: string;
            values: string[];
            default: any[];
            alias: string;
        };
        target: {
            description: string;
            type: string;
            values: string[];
            default: any;
        };
        watch: {
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
        lib: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        bundle: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        noWrite: {
            description: string;
            type: string;
            default: boolean;
        };
        prod: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        chunks: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        minify: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        analyze: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
export default SViteBuildParamsInterface;
