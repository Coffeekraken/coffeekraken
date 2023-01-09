import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightFeatureInterface extends __SInterface {
    static get _definition(): {
        type: {
            type: string;
            description: string;
            default: string;
            physical: boolean;
        };
        size: {
            type: string;
            description: string;
        };
        intensity: {
            type: string;
            description: string;
        };
    };
}
