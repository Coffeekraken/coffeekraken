import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiPanelClassesInterface extends __SInterface {
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
export interface IPostcssUiPanelClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiPanelClassesInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiPanelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
