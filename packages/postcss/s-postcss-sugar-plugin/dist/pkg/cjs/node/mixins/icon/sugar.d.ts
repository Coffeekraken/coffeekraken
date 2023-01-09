import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginIconSugarMixinInterface extends __SInterface {
    static get _definition(): {
        path: {
            type: string;
            required: boolean;
        };
        as: {
            type: string;
        };
    };
}
export interface IPostcssSugarPluginIconFsMixinParams {
    path: string;
    as: string;
}
export { postcssSugarPluginIconSugarMixinInterface as interface };
export default function ({ params, atRule, replaceWith, sourcePath, sharedData, }: {
    params: Partial<IPostcssSugarPluginIconFsMixinParams>;
    atRule: any;
    replaceWith: Function;
    sourcePath: string;
    sharedData: any;
}): void;
