import __SInterface from '@coffeekraken/s-interface';

export default class SGlitchFeatureInterface extends __SInterface {
    static get _definition(): {
        fps: {
            type: string;
            description: string;
            default: number;
        };
        minTimeout: {
            type: string;
            description: string;
            default: number;
        };
        maxTimeout: {
            type: string;
            description: string;
            default: number;
        };
        minDuration: {
            type: string;
            description: string;
            default: number;
        };
        maxDuration: {
            type: string;
            description: string;
            default: number;
        };
    };
}
