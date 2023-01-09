import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
    static get _definition(): {
        space: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginSpaceFunctionInterface as interface };
export interface IPostcssSugarPluginSpaceFunctionParams {
    space: string;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginSpaceFunctionParams>;
}): string;
