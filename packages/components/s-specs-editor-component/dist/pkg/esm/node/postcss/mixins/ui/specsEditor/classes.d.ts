import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSpecsEditorClassesInterface extends __SInterface {
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
export interface IPostcssUiSpecsEditorClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf' | 'behavior' | 'vr')[];
}
export { postcssUiSpecsEditorClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiSpecsEditorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
