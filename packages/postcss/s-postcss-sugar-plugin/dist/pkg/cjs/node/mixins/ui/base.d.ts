import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginUiBaseInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            required: boolean;
        };
        scope: {
            type: string;
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginUiBaseParams {
    name: string;
    scope: string[];
}
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBaseParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
