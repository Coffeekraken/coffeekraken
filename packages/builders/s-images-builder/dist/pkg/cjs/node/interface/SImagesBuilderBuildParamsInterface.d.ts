import __SInterface from '@coffeekraken/s-interface';

export default class SImagesBuilderBuildParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            description: string;
            type: string;
            required: boolean;
            default: any;
            alias: string;
        };
        compressExts: {
            description: string;
            type: string;
            required: boolean;
            default: any;
        };
        inDir: {
            description: string;
            type: string;
            required: boolean;
            default: any;
            alias: string;
        };
        outDir: {
            description: string;
            type: string;
            required: boolean;
            default: any;
            alias: string;
        };
        quality: {
            description: string;
            type: string;
            required: boolean;
            default: any;
            alias: string;
        };
        webp: {
            description: string;
            type: string;
            default: any;
        };
        width: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        height: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        resolution: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        clear: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        specificParams: {
            description: string;
            type: string;
            default: any;
        };
    };
}
