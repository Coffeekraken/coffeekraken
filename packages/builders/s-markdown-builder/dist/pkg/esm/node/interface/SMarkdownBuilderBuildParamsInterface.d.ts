import __SInterface from '@coffeekraken/s-interface';

export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            description: string;
            type: string;
            required: boolean;
            alias: string;
            default: any;
        };
        inDir: {
            description: string;
            type: string;
            required: boolean;
            alias: string;
            default: any;
        };
        inPath: {
            description: string;
            type: string;
            default: any;
        };
        inRaw: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        outDir: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        outPath: {
            description: string;
            type: string;
            default: any;
        };
        data: {
            description: string;
            tyoe: string;
            default: {};
        };
        save: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        cache: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        target: {
            description: string;
            type: string;
            values: string[];
            alias: string;
            default: any;
        };
        preset: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            alias: string;
        };
    };
}
