import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginClassesInterface extends __SInterface {
    static get _definition(): {
        ui: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
export interface IPostcssSugarPluginClassesParams {
    ui: boolean;
}
export { postcssSugarPluginClassesInterface as interface };
export default function ({ params, atRule, cache, sharedData, toCache, replaceWith, }: {
    params: any;
    atRule: any;
    cache: any;
    sharedData: any;
    toCache: any;
    replaceWith: any;
}): Promise<string[]>;
