import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginWireframeBorderMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginWireframeBorderMixinInterface as interface };

export interface postcssSugarPluginWireframeBorderMixinParams {}

/**
 * @name           border
 * @as              @s.wireframe.border
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin gives you back the wireframe border statement that depend on you themeWireframe config
 *
 * @snippet         @s.wireframe.border
 * @s.wireframe.border;
 *
 * @example        css
 * .myCoolItem {
 *  @s.wireframe.border;
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
    params: Partial<postcssSugarPluginWireframeBorderMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginWireframeBorderMixinParams>{
        ...(params ?? {}),
    };

    const vars: string[] = [];
    vars.push(`
        border: s.wireframe.border(light);

        @s.theme dark {
            border: s.wireframe.border(dark);
        }
    `);
    return vars;
}
