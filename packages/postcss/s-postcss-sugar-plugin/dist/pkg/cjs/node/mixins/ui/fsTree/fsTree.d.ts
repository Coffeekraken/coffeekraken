import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFsTreeInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiFsTreeParams {
    scope: string[];
}
export { postcssSugarPluginUiFsTreeInterface as interface };
export default function ({ params, atRule, atRootStart, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFsTreeParams>;
    atRule: any;
    atRootStart: Function;
    replaceWith: Function;
}): string[];
