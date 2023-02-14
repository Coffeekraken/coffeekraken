import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
            type: string;
            values: string[];
            default: string[];
        };
        defaultLnf: {
            type: string;
            values: string[];
            default: any;
        };
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
export interface IPostcssSugarPluginUiButtonClassesParams {
    lnfs: ('solid' | 'outline' | 'text')[];
    defaultLnf: 'solid' | 'outline' | 'text';
    scope: ('bare' | 'lnf' | 'bare' | 'vr' | 'tf')[];
}
export { postcssSugarPluginUiButtonClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
