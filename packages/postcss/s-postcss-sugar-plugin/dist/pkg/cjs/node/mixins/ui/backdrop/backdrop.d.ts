import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginBackdropInterface extends __SInterface {
    static get _definition(): {
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginBackdropParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginBackdropInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: IPostcssSugarPluginBackdropParams;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
