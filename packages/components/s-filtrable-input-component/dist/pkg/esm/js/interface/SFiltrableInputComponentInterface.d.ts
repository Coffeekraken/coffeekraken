import __SInterface from '@coffeekraken/s-interface';

export default class SFiltrableInputComponentInterface extends __SInterface {
    static get _definition(): {
        items: {
            description: string;
            type: string;
        };
        value: {
            description: string;
            type: string;
            default: string;
        };
        label: {
            description: string;
            type: string;
            default: string;
        };
        emptyText: {
            description: string;
            type: string;
            default: string;
        };
        searchValuePreprocess: {
            description: string;
            type: string;
        };
        loadingText: {
            description: string;
            type: string;
            default: string;
        };
        filter: {
            description: string;
            type: string;
        };
        filtrable: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            default: any[];
        };
        showKeywords: {
            description: string;
            type: string;
            default: boolean;
        };
        templates: {
            description: string;
            type: string;
        };
        closeTimeout: {
            description: string;
            type: string;
            default: number;
        };
        interactive: {
            description: string;
            type: string;
            default: boolean;
        };
        closeOnSelect: {
            description: string;
            type: string;
            default: boolean;
        };
        resetOnSelect: {
            description: string;
            type: string;
            default: boolean;
        };
        notSelectable: {
            description: string;
            type: string;
            default: boolean;
        };
        maxItems: {
            description: string;
            type: string;
            default: number;
        };
        classes: {
            description: string;
            type: string;
            default: {};
        };
        inline: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
    };
}
