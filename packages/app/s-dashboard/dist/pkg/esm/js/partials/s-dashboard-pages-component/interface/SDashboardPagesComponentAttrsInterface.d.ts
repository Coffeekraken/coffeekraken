import __SInterface from '@coffeekraken/s-interface';

export default class SDashboardPagesComponentAttrsInterface extends __SInterface {
    static get _definition(): {
        settings: {
            description: string;
            type: string;
            default: {};
        };
    };
}
