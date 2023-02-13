import __SInterface from '@coffeekraken/s-interface';

export default class SComponentUtilsDefaultPropsInterface extends __SInterface {
    static get _definition(): {
        id: {
            description: string;
            type: string;
            physical: boolean;
        };
        mountWhen: {
            description: string;
            type: string;
            values: any;
            default: string;
        };
        activeWhen: {
            description: string;
            type: string;
            values: string[];
            default: string[];
        };
        lod: {
            description: string;
            type: string;
        };
        adoptStyle: {
            description: string;
            type: string;
            default: boolean;
        };
        saveState: {
            description: string;
            type: string;
            default: boolean;
        };
        lnf: {
            description: string;
            type: string;
            default: string;
            physical: boolean;
        };
        bare: {
            description: string;
            type: string;
            default: boolean;
        };
        responsive: {
            description: string;
            type: string;
            default: {};
        };
        prefixEvent: {
            description: string;
            type: string;
            default: boolean;
        };
        verbose: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
