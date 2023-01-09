import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
    static get _definition(): {
        dotPath: {
            type: string;
            required: boolean;
        };
        exclude: {
            type: string;
        };
        only: {
            type: string;
        };
    };
}
export interface IPostcssSugarPluginConfigToCssParams {
    dotPath: string;
    exclude: string[];
    only: string[];
}
export { postcssSugarPluginUtilsConfigToCssInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginConfigToCssParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
