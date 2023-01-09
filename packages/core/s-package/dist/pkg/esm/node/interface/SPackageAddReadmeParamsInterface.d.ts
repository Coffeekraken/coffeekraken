import __SInterface from '@coffeekraken/s-interface';

export default class SPackageAddReadmeParamsInterface extends __SInterface {
    static get _definition(): {
        path: {
            description: string;
            type: string;
            default: any;
        };
    };
}
