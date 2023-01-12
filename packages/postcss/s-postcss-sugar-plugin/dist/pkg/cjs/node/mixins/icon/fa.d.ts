import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginIconFaInterface extends __SInterface {
    static get _definition(): {
        icon: {
            type: string;
            required: boolean;
        };
        style: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export interface IPostcssSugarPluginIconFaParams {
    icon: string;
    style: string;
}
export { postcssSugarPluginIconFaInterface as interface };
export default function ({ params, atRule, replaceWith, postcssApi, sharedData, getRoot, }: {
    params: Partial<IPostcssSugarPluginIconFaParams>;
    atRule: any;
    replaceWith: Function;
    postcssApi: any;
    sharedData: any;
    getRoot: Function;
}): Promise<void>;
