import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginWireframesurfaceMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginWireframesurfaceMixinInterface as interface };

export interface postcssSugarPluginWireframesurfaceMixinParams {}

/**
 * @name           surface
 * @as              @s.wireframe.surface
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin gives you back the wireframe surface statement that depend on you themeWireframe config
 *
 * @snippet         @s.wireframe.surface
 * \@s.wireframe.surface;
 *
 * @example        css
 * .myCoolItem {
 *  \@s.wireframe.surface;
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
    params: Partial<postcssSugarPluginWireframesurfaceMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginWireframesurfaceMixinParams>{
        ...(params ?? {}),
    };

    const vars: string[] = [];
    vars.push(`
        background: s.wireframe.surface(light);
    
        @s.theme dark {
            background: s.wireframe.surface(dark);
        }
    `);
    return vars;
}
