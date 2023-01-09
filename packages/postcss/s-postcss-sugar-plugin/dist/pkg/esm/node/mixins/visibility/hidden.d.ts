import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginVisuallyHiddenMixinInterface extends __SInterface {
    static get _definition(): {};
}
export { postcssSugarPluginVisuallyHiddenMixinInterface as interface };
export interface postcssSugarPluginVisuallyHiddenMixinParams {
}

export default function ({ params, atRule, replaceWith, }: {
    params: Partial<postcssSugarPluginVisuallyHiddenMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
