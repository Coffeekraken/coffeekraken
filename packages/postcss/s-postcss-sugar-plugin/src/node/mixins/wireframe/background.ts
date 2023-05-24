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
 * @as              @sugar.wireframe.background
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin gives you back the wireframe background statement that depend on you themeWireframe config
 *
 * @snippet         @sugar.wireframe.background
 * \@sugar.wireframe.background;
 *
 * @example        css
 * .myCoolItem {
 *  \@sugar.wireframe.background;
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
        background-color: sugar.wireframe.background(light);

        @sugar.theme dark {
            background-color: sugar.wireframe.background(dark);
        }
    `);
    return vars;
}
