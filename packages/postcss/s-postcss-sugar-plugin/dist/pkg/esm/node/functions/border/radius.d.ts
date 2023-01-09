import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition(): {
        radius: {
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
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export interface IPostcssSugarPluginBorderRadiusFunctionParams {
    radius: string;
    scalable: boolean;
}
export default function ({ params, themeValueProxy, }: {
    params: Partial<IPostcssSugarPluginBorderRadiusFunctionParams>;
    themeValueProxy: Function;
}): string;
