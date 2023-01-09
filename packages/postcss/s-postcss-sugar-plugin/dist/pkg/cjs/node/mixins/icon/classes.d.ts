import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginIconClassesInterface extends __SInterface {
    static get _definition(): {
        icons: {
            type: {
                type: string;
                splitChars: string[];
            };
            default: any[];
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginIconClassesParams {
    icons: string[];
}
export { postcssSugarPluginIconClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginIconClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
