import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiAvatarClassesParams {
    scope: ('bare' | 'lnf' | 'interactive' | 'notifications')[];
}
export { postcssSugarPluginUiAvatarClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiAvatarClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
