import __SInterface from '@coffeekraken/s-interface';

export default class SSugarCliParamsInterface extends __SInterface {
    static get _definition(): {
        bench: {
            type: {
                type: string;
                splitChars: string[];
            };
            default: boolean;
            explicit: boolean;
        };
        verbose: {
            type: string;
            default: boolean;
            explicit: boolean;
        };
        target: {
            description: string;
            type: string;
            values: string[];
            explicit: boolean;
        };
        logPreset: {
            type: string;
            values: String[];
            default: string;
            explicit: boolean;
        };
    };
}
