import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginShadowGradientInterface extends __SInterface {
    static get _definition(): {
        x: {
            type: string;
            required: boolean;
            default: number;
        };
        y: {
            type: string;
            required: boolean;
            default: number;
        };
        blur: {
            type: string;
            required: boolean;
            default: number;
        };
        spread: {
            type: string;
            required: boolean;
            default: number;
        };
        startColor: {
            type: string;
            required: boolean;
            default: string;
        };
        endColor: {
            type: string;
            required: boolean;
            default: string;
        };
        angle: {
            type: string;
            required: boolean;
            default: string;
        };
    };
}
export interface IPostcssSugarPluginShadowGradientParams {
    x: number | string;
    y: number | string;
    blur: number | string;
    spread: number | string;
    startColor: string;
    endColor: string;
    angle: string;
}
export { postcssSugarPluginShadowGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginShadowGradientParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
