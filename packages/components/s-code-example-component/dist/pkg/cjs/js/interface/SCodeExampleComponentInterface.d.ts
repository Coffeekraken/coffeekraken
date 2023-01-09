import __SInterface from '@coffeekraken/s-interface';

export default class SCodeExampleComponentInterface extends __SInterface {
    static get _definition(): {
        active: {
            description: string;
            type: string;
        };
        toolbar: {
            description: string;
            type: string;
            values: string[];
            default: string[];
        };
        toolbarPosition: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        languages: {
            description: string;
            type: string;
            default: {};
        };
        items: {
            description: string;
            type: string;
            default: any[];
        };
        lines: {
            description: string;
            type: string;
            default: number;
            physical: boolean;
        };
        moreLabel: {
            description: string;
            type: string;
            default: string;
        };
        lessLabel: {
            description: string;
            type: string;
            default: string;
        };
        moreAction: {
            description: string;
            values: string[];
            type: string;
            default: string;
        };
        more: {
            description: string;
            type: string;
            default: boolean;
        };
        scrollOnMore: {
            description: string;
            type: string;
            default: boolean;
        };
        scrollToSettings: {
            description: string;
            type: string;
            default: {};
        };
    };
}
