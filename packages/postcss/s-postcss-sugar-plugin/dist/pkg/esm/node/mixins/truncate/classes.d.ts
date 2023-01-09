import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition(): {
        count: {
            type: string;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginRatioClassesParams {
    count: number;
}
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginRatioClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
