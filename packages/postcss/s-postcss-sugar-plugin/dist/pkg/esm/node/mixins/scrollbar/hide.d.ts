import __SInterface from '@coffeekraken/s-interface';

declare class PostcssSugarPluginScrollbarHideInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginScrollbarHideParams {
    size: string;
    color: string;
    background: string;
}
export { PostcssSugarPluginScrollbarHideInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginScrollbarHideParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
