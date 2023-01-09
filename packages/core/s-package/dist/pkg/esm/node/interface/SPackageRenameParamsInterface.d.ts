import __SInterface from '@coffeekraken/s-interface';

export default class SPackageRenameParamsInterface extends __SInterface {
    static get _definition(): {
        name: {
            description: string;
            type: string;
        };
        folder: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
