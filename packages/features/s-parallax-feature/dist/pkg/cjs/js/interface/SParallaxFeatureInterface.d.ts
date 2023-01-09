import __SInterface from '@coffeekraken/s-interface';

export default class SParallaxFeatureInterface extends __SInterface {
    static get _definition(): {
        amount: {
            description: string;
            type: string;
            default: number;
        };
        amountX: {
            description: string;
            type: string;
            default: number;
        };
        amountY: {
            description: string;
            type: string;
            default: number;
        };
        amountT: {
            description: string;
            type: string;
            default: number;
        };
        amountTx: {
            description: string;
            type: string;
            default: number;
        };
        amountTy: {
            description: string;
            type: string;
            default: number;
        };
        amountR: {
            description: string;
            type: string;
            default: number;
        };
        amountRx: {
            description: string;
            type: string;
            default: number;
        };
        amountRy: {
            description: string;
            type: string;
            default: number;
        };
        amountRz: {
            description: string;
            type: string;
            default: number;
        };
    };
}
