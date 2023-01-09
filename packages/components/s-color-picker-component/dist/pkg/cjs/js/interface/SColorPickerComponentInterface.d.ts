import __SInterface from '@coffeekraken/s-interface';

export default class SColorPickerComponentInterface extends __SInterface {
    static get _definition(): {
        name: {
            description: string;
            type: string;
            default: string;
        };
        value: {
            description: string;
            type: string;
        };
        updateInput: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
        format: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        inline: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
        i18n: {
            description: string;
            type: string;
            default: {
                reset: string;
                clear: string;
                validate: string;
            };
        };
        placeholder: {
            description: string;
            type: string;
            default: string;
        };
        backdrop: {
            description: string;
            type: string;
            default: boolean;
        };
        eyeDropper: {
            description: string;
            type: string;
            default: boolean;
        };
        actions: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
        floatSettings: {
            description: string;
            type: string;
            default: {
                position: string;
                shift: number;
                offset: number;
                arrow: boolean;
                arrowSize: number;
                arrowPadding: number;
            };
        };
        eyeDropperIconClass: {
            description: string;
            type: string;
            default: string;
        };
        copyIconClass: {
            description: string;
            type: string;
            default: string;
        };
        copiedIconClass: {
            description: string;
            type: string;
            default: string;
        };
        buttonIconClass: {
            description: string;
            type: string;
            default: string;
        };
        backdropClass: {
            description: string;
            type: string;
            default: string;
        };
        disabled: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
