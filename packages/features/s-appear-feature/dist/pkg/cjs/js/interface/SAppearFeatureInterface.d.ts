import __SInterface from '@coffeekraken/s-interface';

export default class SAppearFeatureInterface extends __SInterface {
    static get _definition(): {
        in: {
            description: string;
            type: string;
            default: string;
            physical: boolean;
        };
        out: {
            description: string;
            type: string;
            physical: boolean;
        };
        delay: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            default: number[];
        };
        duration: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            default: number[];
        };
        distance: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            default: number[];
        };
        appear: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
    };
}
