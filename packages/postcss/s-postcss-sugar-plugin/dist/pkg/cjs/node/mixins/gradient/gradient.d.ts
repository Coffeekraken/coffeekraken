import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginGradientInterface extends __SInterface {
    static get _definition(): {
        start: {
            type: string;
            required: boolean;
            alias: string;
        };
        end: {
            type: string;
            required: boolean;
            alias: string;
        };
        type: {
            type: string;
            values: string[];
            default: string;
        };
        x: {
            type: string;
            default: any;
        };
        y: {
            type: string;
            default: any;
        };
        angle: {
            type: string;
            default: any;
        };
        size: {
            type: string;
            default: string;
        };
    };
}
export interface IPostcssSugarPluginGradientParams {
    start: string;
    end: string;
    x: string;
    y: string;
    type: 'linear' | 'radial';
    angle: string | number;
    size: string;
}
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginGradientParams>;
    atRule: any;
    replaceWith: Function;
}): any[];
