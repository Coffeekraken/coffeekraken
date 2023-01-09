import __SInterface from '@coffeekraken/s-interface';

declare class SKitchenAddParamsInterface extends __SInterface {
    static get _definition(): {
        ingredients: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            required: boolean;
            alias: string;
        };
    };
}
export default SKitchenAddParamsInterface;
