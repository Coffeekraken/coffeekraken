import __SInterface from '@coffeekraken/s-interface';

export default class SRatingComponentInterface extends __SInterface {
    static get _definition(): {
        name: {
            description: string;
            type: string;
            default: string;
        };
        value: {
            description: string;
            type: string;
            default: number;
        };
        min: {
            description: string;
            type: string;
            default: number;
        };
        max: {
            description: string;
            type: string;
            default: number;
        };
        icon: {
            description: string;
            type: string;
            default: string;
        };
        iconClass: {
            description: string;
            type: string;
        };
        readonly: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
    };
}
