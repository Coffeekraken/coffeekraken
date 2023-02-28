import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';

class postcssSugarPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopeWireframeMixinInterface as interface };

export interface postcssSugarPluginScopeWireframeMixinParams {}

/**
 * @name           wireframe
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to specify some css used only for wireframe. Basically it's the same as
 * calling the mixin @sugar.lod (<2, false); that mean "less than 2 and don't keep when lod is disabled".
 * It also prevent the lod to be applied inside the atRule.
 *
 * @snippet         @sugar.lod.wireframe
 * \@sugar.lod.wireframe {
 *      $1
 * }
 * 
 * @example        css
 * \@sugar.lod.wireframe() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    sharedData,
    atRule,
    settings,
    postcssApi,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
    sharedData: any;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginScopeWireframeMixinParams>{
        scopes: [],
        ...(params ?? {}),
    };

    const newRule = postcssApi.atRule({
        name: `sugar.lod`,
        params: `(<2, $keepWhenLodDisabled: false)`,
        nodes: atRule.nodes,
    });

    atRule.replaceWith(newRule);
}
