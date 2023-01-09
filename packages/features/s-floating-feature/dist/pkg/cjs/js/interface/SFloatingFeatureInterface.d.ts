import __SInterface from '@coffeekraken/s-interface';

export default class SFloatingFeatureInterface extends __SInterface {
    static get _definition(): {
        ref: {
            description: string;
            type: string;
        };
        position: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        shift: {
            description: string;
            type: string;
            default: number;
        };
        offset: {
            description: string;
            type: string;
        };
        arrow: {
            description: string;
            type: string;
            default: boolean;
        };
        arrowSize: {
            description: string;
            type: string;
            default: number;
        };
        arrowPadding: {
            description: string;
            type: string;
            default: number;
        };
    };
}
