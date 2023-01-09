import __SInterface from '@coffeekraken/s-interface';

export default class SDepsFeatureInterface extends __SInterface {
    static get _definition(): {
        css: {
            type: string;
            description: string;
        };
    };
}
