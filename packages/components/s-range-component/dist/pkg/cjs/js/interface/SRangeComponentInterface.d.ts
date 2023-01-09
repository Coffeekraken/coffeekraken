import __SInterface from '@coffeekraken/s-interface';

export default class SRangeComponentInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            description: string;
        };
        value: {
            type: string;
            description: string;
        };
        values: {
            type: string;
            description: string;
        };
        min: {
            type: string;
            description: string;
            default: number;
        };
        max: {
            type: string;
            description: string;
            default: number;
        };
        step: {
            type: string;
            description: string;
        };
        target: {
            type: string;
            description: string;
        };
        tooltip: {
            type: string;
            description: string;
            default: boolean;
        };
        disabled: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
