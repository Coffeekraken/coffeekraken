import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginWireframebackgroundMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginWireframebackgroundMixinInterface as interface };

export interface postcssSugarPluginWireframebackgroundMixinParams {}

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
 * \@s.wireframe.background;
 *
 * @example        css
 * .myCoolItem {
 *  \@s.wireframe.background;
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
    params: Partial<postcssSugarPluginWireframebackgroundMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginWireframebackgroundMixinParams>{
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
