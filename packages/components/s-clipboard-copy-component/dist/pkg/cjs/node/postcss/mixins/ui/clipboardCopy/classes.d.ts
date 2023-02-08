import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiClipboardCopyClassesInterface extends __SInterface {
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
export interface IPostcssUiClipboardCopyClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiClipboardCopyClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiClipboardCopyClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
