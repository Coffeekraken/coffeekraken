import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginColorSecondaryMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginColorSecondaryMixinInterface as interface };

/**
 * @name           complementary
 * @as          @s.color.complementary
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to (re)map the "complementary" color to another one you want like "accent", "success", etc...
 *
 * @param       {String}        color           The color you want to map on another one
 * @return      {Css}                     The generated remap css
 *
 * @snippet         @s.color.complementary($1)
 *
 * @example        css
 * .my-section {
 *      @s.color.complementary(accent);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSugarcssPluginColorSecondaryParams {
    color: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginColorSecondaryParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginColorSecondaryParams = {
        color: '',
        ...params,
    };

    const vars: string[] = [
        `
        @s.color.remap(complementary, ${finalParams.color});
    `,
    ];

    return vars;
}
