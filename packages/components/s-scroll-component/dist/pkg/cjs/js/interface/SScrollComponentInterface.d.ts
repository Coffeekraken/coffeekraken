import __SInterface from '@coffeekraken/s-interface';

export default class SScrollComponentInterface extends __SInterface {
    static get _definition(): {
        to: {
            description: string;
            type: string;
            required: boolean;
        };
        duration: {
            description: string;
            type: string;
            default: any;
        };
        offset: {
            description: string;
            type: string;
            default: any;
        };
        offsetX: {
            description: string;
            type: string;
            default: any;
        };
        offsetY: {
            description: string;
            type: string;
            default: any;
        };
    };
}
