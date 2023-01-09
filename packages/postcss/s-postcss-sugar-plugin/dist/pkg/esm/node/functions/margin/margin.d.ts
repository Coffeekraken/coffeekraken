import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginMarginFunctionInterface extends __SInterface {
    static get _definition(): {
        margin: {
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
export { postcssSugarPluginMarginFunctionInterface as interface };
export interface IPostcssSugarPluginMarginFunctionParams {
    margin: string;
    scalable: boolean;
}
export default function ({ params, themeValueProxy, }: {
    params: Partial<IPostcssSugarPluginMarginFunctionParams>;
    themeValueProxy: Function;
}): string;
