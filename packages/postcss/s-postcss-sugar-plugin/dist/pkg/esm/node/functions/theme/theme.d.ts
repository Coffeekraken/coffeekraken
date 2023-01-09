import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginThemeInterface extends __SInterface {
    static get _definition(): {
        dotPath: {
            type: string;
            required: boolean;
        };
        scalable: {
            type: string;
            default: boolean;
        };
        return: {
            type: string;
            values: string[];
            default: string;
        };
        fallback: {
            type: string;
            default: boolean;
        };
    };
}
export { postcssSugarPluginThemeInterface as interface };
export interface IPostcssSugarPluginThemeParams {
    dotPath: string;
    scalable: boolean;
    return: 'var' | 'value';
    fallback: boolean;
}
export default function theme({ params, }: {
    params: Partial<IPostcssSugarPluginThemeParams>;
}): any;
