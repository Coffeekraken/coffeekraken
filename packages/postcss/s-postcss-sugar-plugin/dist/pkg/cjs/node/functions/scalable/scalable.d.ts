import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginScalableFunctionInterface extends __SInterface {
    static get _definition(): {
        value: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginScalableFunctionInterface as interface };
export interface IPostcssSugarPluginScalableFunctionParams {
    value: string | number;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginScalableFunctionParams>;
}): string;
