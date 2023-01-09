import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginImportInterface extends __SInterface {
    static get _definition(): {
        path: {
            type: string;
            required: boolean;
        };
        media: {
            type: string;
        };
    };
}
export interface IPostcssSugarPluginImportParams {
    path: string;
    media: string;
}
export { postcssSugarPluginImportInterface as interface };
export default function ({ params, atRule, postcss, registerPostProcessor, settings, }: {
    params: IPostcssSugarPluginImportParams;
    atRule: any;
    postcss: any;
    registerPostProcessor: Function;
    settings: any;
}): void;
