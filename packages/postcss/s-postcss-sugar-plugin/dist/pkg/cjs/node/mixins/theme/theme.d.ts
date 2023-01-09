import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginThemeinInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
        };
        theme: {
            type: string;
        };
        scope: {
            type: string;
            default: boolean;
        };
    };
}
export interface IPostcssSugarPluginThemeParams {
    variant: string | undefined;
    theme: string | undefined;
    scope: boolean;
}
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginThemeParams>;
    atRule: any;
    replaceWith: Function;
}): any;
