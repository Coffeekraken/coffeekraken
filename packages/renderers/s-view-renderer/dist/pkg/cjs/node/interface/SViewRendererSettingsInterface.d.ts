import __SInterface from '@coffeekraken/s-interface';

export default class SViewRendererSettingsInterface extends __SInterface {
    static get _definition(): {
        rootDirs: {
            description: string;
            type: string;
            default: any;
        };
        cacheDir: {
            description: string;
            type: string;
            default: any;
        };
        defaultEngine: {
            description: string;
            type: string;
            values: string[];
            default: any;
        };
        enginesSettings: {
            description: string;
            type: string;
            default: {};
        };
        defaultData: {
            description: string;
            type: string;
            default: {};
        };
        sharedDataFiles: {
            description: string;
            type: string;
            default: any;
        };
    };
}
