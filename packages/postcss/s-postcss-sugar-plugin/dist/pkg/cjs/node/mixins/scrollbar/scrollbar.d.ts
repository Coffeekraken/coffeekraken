import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginScrollbarInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            default: any;
        };
        background: {
            type: string;
            default: any;
        };
        size: {
            type: string;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginScrollbarParams {
    size: string;
    color: string;
    background: string;
}
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginScrollbarParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
