import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';
declare class postcssSugarPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition(): {};
}
export { postcssSugarPluginScopeWireframeMixinInterface as interface };
export interface postcssSugarPluginScopeWireframeMixinParams {
}

export default function ({ params, sharedData, atRule, settings, postcssApi, }: {
    params: Partial<IPostcssSugarPluginColorParams>;
    sharedData: any;
    atRule: any;
    settings: any;
    postcssApi: any;
}): void;
