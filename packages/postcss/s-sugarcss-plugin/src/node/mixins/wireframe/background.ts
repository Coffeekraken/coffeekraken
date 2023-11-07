import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginWireframebackgroundMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginWireframebackgroundMixinInterface as interface };

export interface SSugarcssPluginWireframebackgroundMixinParams {}

/**
 * @name           background
 * @as              @s.wireframe.background
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin gives you back the wireframe background statement that depend on you themeWireframe config
 *
 * @snippet         @s.wireframe.background
 * @s.wireframe.background;
 *
 * @example        css
 * .myCoolItem {
 *  @s.wireframe.background;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<SSugarcssPluginWireframebackgroundMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginWireframebackgroundMixinParams>{
        ...(params ?? {}),
    };

    const vars: string[] = [];
    vars.push(`
        background-color: s.wireframe.background(light);

        @s.theme dark {
            background-color: s.wireframe.background(dark);
        }
    `);
    return vars;
}
