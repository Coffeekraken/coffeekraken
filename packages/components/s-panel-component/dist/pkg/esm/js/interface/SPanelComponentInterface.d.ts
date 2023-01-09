import __SInterface from '@coffeekraken/s-interface';

export default class SPanelComponentInterface extends __SInterface {
    static get _definition(): {
        position: {
            description: string;
            type: string;
            values: string[];
            default: string;
            physical: boolean;
        };
        active: {
            description: string;
            type: string;
            default: boolean;
            physical: boolean;
        };
        backdrop: {
            description: string;
            type: string;
            default: boolean;
        };
        triggerer: {
            description: string;
            type: string;
        };
        closeOn: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
