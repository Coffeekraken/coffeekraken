import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginClearfixClassesInterface extends __SInterface {
    static get _definition(): {
        defaultClearfix: {
            type: string;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginClearfixClassesParams {
    defaultClearfix: any;
}
export { postcssSugarPluginClearfixClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginClearfixClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
