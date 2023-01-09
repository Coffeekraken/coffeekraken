import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTransitionMixinInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            required: boolean;
            default: string;
        };
    };
}
export { postcssSugarPluginTransitionMixinInterface as interface };
export interface postcssSugarPluginTransitionMixinParams {
    name: string;
}

export default function ({ params, atRule, replaceWith, }: {
    params: Partial<postcssSugarPluginTransitionMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
