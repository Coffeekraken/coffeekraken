import __SInterface from '@coffeekraken/s-interface';

export default class SPackageSettingsInterface extends __SInterface {
    static get _definition(): {
        manager: {
            description: string;
            type: string;
            values: string[];
            default: any;
        };
    };
}
