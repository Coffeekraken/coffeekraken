import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition(): {
        font: {
            type: string;
            values: string[];
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginFontFamilyParams {
    font: string;
}
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
