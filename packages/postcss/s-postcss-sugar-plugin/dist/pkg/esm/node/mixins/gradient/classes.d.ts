import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginGradientClassesInterface extends __SInterface {
    static get _definition(): {
        types: {
            type: string;
            values: string[];
            default: string[];
            alias: string;
        };
        angles: {
            type: string;
            default: number[];
            alias: string;
        };
    };
}
export interface IPostcssSugarPluginGradientClassesParams {
    types: string[];
    angles: number[];
}
export { postcssSugarPluginGradientClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginGradientClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
