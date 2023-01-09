import __SInterface from '@coffeekraken/s-interface';

export default class SSugarJsonAddParamsInterface extends __SInterface {
    static get _definition(): {
        recipe: {
            description: string;
            type: string;
            required: boolean;
        };
    };
}
