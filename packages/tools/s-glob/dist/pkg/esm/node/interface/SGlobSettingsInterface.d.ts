import __SInterface from '@coffeekraken/s-interface';

export default class SGlobSettingsInterface extends __SInterface {
    static get _definition(): {
        cwd: {
            description: string;
            type: string;
            default: any;
        };
        symlinks: {
            description: string;
            type: string;
            default: boolean;
        };
        nodir: {
            description: string;
            type: string;
            default: boolean;
        };
        contentRegExp: {
            description: string;
            type: string;
        };
        SFile: {
            description: string;
            type: string;
            default: boolean;
        };
        exclude: {
            description: string;
            type: string;
            default: any[];
        };
        defaultExcludes: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
