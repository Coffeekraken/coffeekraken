import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFitInterface extends __SInterface {
    static get _definition(): {
        size: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export interface IPostcssSugarPluginFitParams {
    size: 'fill' | 'contain' | 'cover' | 'none' | 'abs';
}
export { postcssSugarPluginFitInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFitParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): string[];
