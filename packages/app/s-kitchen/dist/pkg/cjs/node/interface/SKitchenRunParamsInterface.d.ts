import __SInterface from '@coffeekraken/s-interface';

declare class SKitchenRunInterface extends __SInterface {
    static get _definition(): {
        stack: {
            description: string;
            type: string;
            alias: string;
        };
        action: {
            description: string;
            type: string;
            alias: string;
        };
        recipe: {
            description: string;
            type: string;
            alias: string;
        };
        params: {
            description: string;
            type: string;
            alias: string;
        };
    };
}
export default SKitchenRunInterface;
