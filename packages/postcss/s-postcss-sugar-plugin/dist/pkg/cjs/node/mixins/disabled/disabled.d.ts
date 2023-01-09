import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginDisabledParams {
}
export { postcssSugarPluginDisabledInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
