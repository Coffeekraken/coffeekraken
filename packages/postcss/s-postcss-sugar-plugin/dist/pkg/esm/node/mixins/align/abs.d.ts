import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginAlignInterface extends __SInterface {
    static get _definition(): {
        align: {
            type: string;
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginAlignParams {
    align: string;
}
export { postcssSugarPluginAlignInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: IPostcssSugarPluginAlignParams;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
