import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginTransitionFunctionInterface as interface };
export interface IPostcssSugarPluginTransitionFunctionParams {
    name: string;
}
export default function ({ params, themeValueProxy, }: {
    params: Partial<IPostcssSugarPluginTransitionFunctionParams>;
    themeValueProxy: Function;
}): string;
