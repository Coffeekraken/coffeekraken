import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
    static get _definition(): {
        opacity: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginOpacityFunctionInterface as interface };
export interface IPostcssSugarPluginOpacityFunctionParams {
    opacity: string;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginOpacityFunctionParams>;
}): string;
