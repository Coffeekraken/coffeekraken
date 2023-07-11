import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginWireframeParams } from '../../functions/color/color.js';

class postcssSugarPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopeWireframeMixinInterface as interface };

export interface postcssSugarPluginWireframeMixinParams {}

/**
 * @name           wireframe
 * @as              @sugar.wireframe
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to specify some css used only for wireframe.
 * It also prevent the lod to be applied inside the atRule.
 *
 * @snippet         @sugar.lod.wireframe
 * \@sugar.wireframe {
 *      $1
 * }
 *
 * @example        css
 * \@sugar.wireframe() {
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
    params: Partial<IPostcssSugarPluginWireframeParams>;
    sharedData: any;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginWireframeMixinParams>{
        ...(params ?? {}),
    };

    const newRule = postcssApi.rule({
        selector: '.s-wireframe &',
        nodes: atRule.nodes,
    });

    atRule.replaceWith(newRule);
}
