import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static get _definition(): {
        padding: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
        scalable: {
            type: string;
            default: any;
        };
    };
}
export { postcssSugarPluginPaddingFunctionInterface as interface };
export interface IPostcssSugarPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}
export default function ({ params, themeValueProxy, }: {
    params: Partial<IPostcssSugarPluginPaddingFunctionParams>;
    themeValueProxy: Function;
}): string;
