import __SInterface from '@coffeekraken/s-interface';

export default class SPackageInstallParamsInterface extends __SInterface {
    static get _definition(): {
        manager: {
            description: string;
            type: string;
            values: string[];
            default: any;
        };
    };
}
