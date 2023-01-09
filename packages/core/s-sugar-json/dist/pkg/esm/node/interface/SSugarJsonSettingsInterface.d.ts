import __SInterface from '@coffeekraken/s-interface';

export default class SSugarJsonSettingsInterface extends __SInterface {
    static get _definition(): {
        packages: {
            description: string;
            type: string;
        };
        includePackage: {
            description: string;
            type: string;
            default: boolean;
        };
        includeModules: {
            description: string;
            type: string;
            default: boolean;
        };
        includeGlobal: {
            description: string;
            type: string;
            default: boolean;
        };
        includeTop: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
