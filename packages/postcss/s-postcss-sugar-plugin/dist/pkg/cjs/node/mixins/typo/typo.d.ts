import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTypoInterface extends __SInterface {
    static get _definition(): {
        typo: {
            type: string;
            description: string;
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginTypoParams {
    typo: string;
}
export { postcssSugarPluginTypoInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginTypoParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
