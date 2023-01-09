import __SInterface from '@coffeekraken/s-interface';

export default class SActivateFeatureInterface extends __SInterface {
    static get _definition(): {
        href: {
            description: string;
            type: string;
            default: string;
        };
        group: {
            description: string;
            type: string;
        };
        toggle: {
            description: string;
            type: {
                type: string;
                nullishAsTrue: boolean;
            };
            default: boolean;
        };
        history: {
            description: string;
            type: {
                type: string;
                nullishAsTrue: boolean;
            };
            default: boolean;
        };
        active: {
            description: string;
            type: {
                type: string;
                nullishAsTrue: boolean;
            };
            default: boolean;
            physical: boolean;
        };
        activeClass: {
            description: string;
            type: string;
            default: string;
        };
        activeAttribute: {
            description: string;
            type: string;
            default: string;
        };
        saveState: {
            description: string;
            type: string;
            default: boolean;
        };
        activateTimeout: {
            description: string;
            type: string;
            default: number;
        };
        unactivateTimeout: {
            description: string;
            type: string;
            default: number;
        };
        triggerer: {
            description: string;
            type: string;
        };
        trigger: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
        unactivateOn: {
            description: string;
            type: string;
        };
    };
}
