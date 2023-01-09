import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition(): {
        width: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
        scalable: {
            type: string;
            default: boolean;
        };
    };
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };
export interface IPostcssSugarPluginBorderWidthFunctionParams {
    width: string;
    scalable: boolean;
}
export default function ({ params, themeValueProxy, }: {
    params: Partial<IPostcssSugarPluginBorderWidthFunctionParams>;
    themeValueProxy: Function;
}): string;
