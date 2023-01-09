import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            required: boolean;
        };
        toColor: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginColorRemapMixinInterface as interface };

export interface IPostcssSugarPluginColorRemapParams {
    color: string;
    toColor: string;
}
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginColorRemapParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
