import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';
declare class postcssSugarPluginScopePreventMixinInterface extends __SInterface {
    static get _definition(): {};
}
export { postcssSugarPluginScopePreventMixinInterface as interface };
export interface postcssSugarPluginScopePreventMixinParams {
}
export default function ({ params, sharedData, atRule, replaceWith, postcssApi, }: {
    params: Partial<IPostcssSugarPluginColorParams>;
    sharedData: any;
    atRule: any;
    replaceWith: Function;
    postcssApi: any;
}): void;
