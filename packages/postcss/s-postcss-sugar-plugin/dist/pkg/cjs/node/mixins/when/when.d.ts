import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition(): {
        state: {
            type: string;
            values: string[];
            required: boolean;
        };
        context: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginmountedMixinInterface as interface };
export interface postcssSugarPluginmountedMixinParams {
    state: 'mounted' | 'active' | 'dark' | 'light';
    context: 'self' | 'sibling' | 'parent' | 'ancestor' | 'theme';
}
export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginmountedMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
