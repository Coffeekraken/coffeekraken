import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition(): {
        state: {
            type: string;
            values: string[];
            required: boolean;
        };
        sibling: {
            type: string;
            default: boolean;
        };
    };
}
export { postcssSugarPluginmountedMixinInterface as interface };
export interface postcssSugarPluginmountedMixinParams {
    state: 'mounted';
    sibling: boolean;
}
export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginmountedMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
