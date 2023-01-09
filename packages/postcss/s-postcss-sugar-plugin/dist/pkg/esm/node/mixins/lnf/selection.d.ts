import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginLookAndFeelSelectionParams {
}
export { postcssSugarPluginLiikAndFeelSelectionInterface as interface };

export default function ({ params, atRule, replaceWith, }: {
    params: IPostcssSugarPluginLookAndFeelSelectionParams;
    atRule: any;
    replaceWith: Function;
}): string[];
