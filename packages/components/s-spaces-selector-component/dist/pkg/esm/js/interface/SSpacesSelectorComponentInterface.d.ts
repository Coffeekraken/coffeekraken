import __SInterface from '@coffeekraken/s-interface';

export default class SSpacesSelectorComponentInterface extends __SInterface {
    static get _definition(): {
        spaces: {
            type: string;
            description: string;
            required: boolean;
            readonly default: {
                margin: any;
                padding: any;
            };
        };
        values: {
            type: string;
            description: string;
            default: {};
        };
        valueProp: {
            type: string;
            description: string;
            default: string;
        };
    };
}
