import __SInterface from '@coffeekraken/s-interface';

export default class STypescriptBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            description: string;
            type: string;
            readonly default: any;
            alias: string;
        };
        inDir: {
            description: string;
            type: string;
            readonly default: any;
            alias: string;
        };
        outDir: {
            description: string;
            type: string;
            readonly default: any;
            alias: string;
        };
        packageRoot: {
            description: string;
            type: string;
            default: any;
        };
        formats: {
            description: string;
            type: string;
            values: string[];
            readonly default: any;
            alias: string;
        };
        platform: {
            description: string;
            type: string;
            values: string[];
            readonly default: any;
            alias: string;
        };
        declarationFiles: {
            description: string;
            type: string;
            default: boolean;
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
            alias: string;
        };
        customSettings: {
            description: string;
            type: string;
            readonly default: void;
            alias: string;
        };
        exclude: {
            description: string;
            type: string;
            readonly default: void;
            alias: string;
        };
        save: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
