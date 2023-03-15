import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSpacesSelectorClassesInterface extends __SInterface {
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
export interface IPostcssUiSpacesSelectorClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiSpacesSelectorClassesInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiSpacesSelectorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
