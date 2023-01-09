import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginLookAndFeelBaseParams {
}
export { postcssSugarPluginLiikAndFeelBaseInterface as interface };

export default function ({ params, atRule, replaceWith, }: {
    params: IPostcssSugarPluginLookAndFeelBaseParams;
    atRule: any;
    replaceWith: Function;
}): string[];
