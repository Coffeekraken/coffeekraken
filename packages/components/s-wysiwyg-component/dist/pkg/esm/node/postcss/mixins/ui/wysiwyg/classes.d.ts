import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiWysiwygClassesInterface extends __SInterface {
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
export interface IPostcssUiWysiwygClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf')[];
}
export { postcssUiWysiwygClassesInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiWysiwygClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
