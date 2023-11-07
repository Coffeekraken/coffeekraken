import __SInterface from '@coffeekraken/s-interface';
import { ISSugarcssPluginWireframeParams } from '../../functions/color/color.js';

class SSugarcssPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginScopeWireframeMixinInterface as interface };

export interface SSugarcssPluginWireframeMixinParams {}

/**
 * @name           wireframe
 * @as              @s.wireframe
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to specify some css used only for wireframe.
 * It also prevent the lod to be applied inside the atRule.
 *
 * @snippet         @s.lod.wireframe
 * @s.wireframe {
 *      $1
 * }
 *
 * @example        css
 * @s.wireframe() {
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
    params: Partial<ISSugarcssPluginWireframeParams>;
    sharedData: any;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <SSugarcssPluginWireframeMixinParams>{
        ...(params ?? {}),
    };

    const newRule = postcssApi.rule({
        selector: '.s-wireframe &',
        nodes: atRule.nodes,
    });

    atRule.replaceWith(newRule);
}
