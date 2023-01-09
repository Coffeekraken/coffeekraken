import __SInterface from '@coffeekraken/s-interface';

export default class SDatetimePickerComponentInterface extends __SInterface {
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
            default: string;
        };
        inline: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
        calendar: {
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
                months: string[];
            };
        };
        placeholder: {
            description: string;
            type: string;
            default: string;
        };
        floatSettings: {
            description: string;
            type: string;
            default: {};
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
        disable: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            default: any[];
        };
        disabled: {
            description: string;
            type: string;
            default: boolean;
        };
        backdrop: {
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
        hours: {
            description: string;
            type: string;
            default: number[];
        };
        minutes: {
            description: string;
            type: string;
            default: number[];
        };
        fromYear: {
            description: string;
            type: string;
            default: number;
        };
        toYear: {
            description: string;
            type: string;
            default: number;
        };
    };
}
