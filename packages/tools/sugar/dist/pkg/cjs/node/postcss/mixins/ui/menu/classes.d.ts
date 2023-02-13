import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiCodeExampleClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
            type: string;
            values: string[];
            default: string[];
        };
        types: {
            type: string;
            values: string[];
            default: string[];
        };
        defaultLnf: {
            type: string;
            values: string[];
            default: any;
        };
        defaultType: {
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
export interface IPostcssUiCodeExampleClassesParams {
    lnfs: 'solid'[];
    types: ('primary' | 'mobile')[];
    defaultLnf: 'solid';
    defaultType: 'primary' | 'mobile';
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiCodeExampleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiCodeExampleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
