import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorSecondaryMixinInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginColorSecondaryMixinInterface as interface };

export interface IPostcssSugarPluginColorSecondaryParams {
    color: string;
}
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginColorSecondaryParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
