import __SInterface from '@coffeekraken/s-interface';

export default class SRefocusFeatureInterface extends __SInterface {
    static get _definition(): {
        trigger: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: any[];
        };
        timeout: {
            description: string;
            type: string;
            default: number;
        };
        duration: {
            description: string;
            type: string;
        };
        easing: {
            description: string;
            type: string;
        };
        focusedClass: {
            description: string;
            type: string;
            default: string;
        };
        focusedClassDuration: {
            description: string;
            type: string;
            default: number;
        };
        offset: {
            description: string;
            type: string;
        };
        offsetX: {
            description: string;
            type: string;
        };
        offsetY: {
            description: string;
            type: string;
        };
        align: {
            description: string;
            type: string;
            values: string[];
        };
        justify: {
            description: string;
            type: string;
            values: string[];
        };
    };
}
