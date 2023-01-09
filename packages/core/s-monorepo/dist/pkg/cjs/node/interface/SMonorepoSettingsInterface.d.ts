import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoSettingsInterface extends __SInterface {
    static get _definition(): {
        rootDir: {
            description: string;
            type: string;
        };
        packagesGlob: {
            description: string;
            type: string;
            default: any;
        };
    };
}
