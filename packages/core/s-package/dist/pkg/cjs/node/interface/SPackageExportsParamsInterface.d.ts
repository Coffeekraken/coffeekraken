import __SInterface from '@coffeekraken/s-interface';

export default class SPackageExportsParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        buildInitial: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        folderModuleMap: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        folderPlatformMap: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
    };
}
