import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiAvatarInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiBadgeParams {
    scope: ('bare' | 'lnf' | 'interactive' | 'notifications')[];
}
export { postcssSugarPluginUiAvatarInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
