import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          global
 * @as              @s.scale.global
 * @namespace     node.mixin.scale
 * @type          PostcssMixin
 * @platform      postcss
 * @interface       ./scale
 * @status        beta
 *
 * This mixin allows you to set the --s-scale-global variable to whatever you want
 *
 * @param       {Number}        value      The value you want for scale (0-...)
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.scale.global($1)
 *
 * @example       css
 * .my-element {
 *    @s.scale.global(1.2);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginScaleGlobalMixinInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'Number',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScaleGlobalMixinInterface as interface };

export interface IPostcssSugarPluginScaleGlobalMixinParams {
    value: string | number;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginScaleGlobalMixinParams>;
}) {
    const finalParams: IPostcssSugarPluginScaleGlobalMixinParams = {
        value: '',
        ...params,
    };

    return `--s-scale-global: ${finalParams.value};`;
}
