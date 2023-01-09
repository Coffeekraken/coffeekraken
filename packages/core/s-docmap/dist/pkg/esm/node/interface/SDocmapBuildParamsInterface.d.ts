import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapBuildParamsInterface extends __SInterface {
    static get _definition(): {
        globs: {
            type: string;
            description: string;
            default: any;
        };
        exclude: {
            type: string;
            description: string;
            default: any;
            level: number;
        };
        tags: {
            type: string;
            description: string;
            alias: string;
            default: any;
        };
        filters: {
            type: string;
            description: string;
            default: any;
        };
        noExtends: {
            type: {
                type: string;
                nullishAsTrue: boolean;
            };
            description: string;
            default: any;
        };
        excludePackages: {
            type: {
                type: string;
                splitChars: string[];
            };
            description: string;
            default: any;
        };
        save: {
            type: string;
            alias: string;
            description: string;
            default: any;
        };
        outPath: {
            type: string;
            alias: string;
            description: string;
            default: any;
        };
    };
}
export default SDocmapBuildParamsInterface;
