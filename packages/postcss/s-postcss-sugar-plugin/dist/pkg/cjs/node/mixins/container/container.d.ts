import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginContainerInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            required: boolean;
            default: string;
        };
    };
}
export interface IPostcssSugarPluginContainerParams {
    name: string;
}
export { postcssSugarPluginContainerInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginContainerParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
