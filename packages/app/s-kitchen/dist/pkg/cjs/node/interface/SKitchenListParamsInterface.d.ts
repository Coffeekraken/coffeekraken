import __SInterface from '@coffeekraken/s-interface';

declare class SKitchenListParamsInterface extends __SInterface {
    static get _definition(): {
        recipe: {
            description: string;
            type: string;
            alias: string;
        };
        ingredients: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
export default SKitchenListParamsInterface;
