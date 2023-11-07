import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          scale
 * @as              @s.scale
 * @namespace     node.mixin.scale
 * @type          PostcssMixin
 * @platform      postcss
 * @interface       ./scale
 * @status        stable
 *
 * This mixin allows you to set the --s-scale variable to whatever you want
 *
 * @param       {Number}        value      The value you want for scale (0-...)
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.scale($1)
 *
 * @example       css
 * .my-element {
 *    @s.scale(1.2);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginScaleMixinInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'Number',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScaleMixinInterface as interface };

export interface ISSugarcssPluginScaleMixinParams {
    value: string | number;
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginScaleMixinParams>;
}) {
    const finalParams: ISSugarcssPluginScaleMixinParams = {
        value: '',
        ...params,
    };

    return `--s-scale: ${finalParams.value};`;
}
