import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoUpgradeParamsInterface extends __SInterface {
    static get _definition(): {
        packagesGlob: {
            description: string;
            type: string;
            default: any;
        };
        files: {
            description: string;
            type: string;
            default: any;
        };
        fields: {
            description: string;
            type: string;
            default: any;
        };
    };
}
