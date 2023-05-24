import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          scale
 * @as              @sugar.scale
 * @namespace     node.mixin.scale
 * @type          PostcssMixin
 * @platform      postcss
 * @interface       ./scale
 * @status        beta
 *
 * This mixin allows you to set the --s-scale variable to whatever you want
 *
 * @param       {Number}        value      The value you want for scale (0-...)
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.scale($1)
 *
 * @example       css
 * .my-element {
 *    @sugar.scale(1.2);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginScaleMixinInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'Number',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScaleMixinInterface as interface };

export interface IPostcssSugarPluginScaleMixinParams {
    value: string | number;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginScaleMixinParams>;
}) {
    const finalParams: IPostcssSugarPluginScaleMixinParams = {
        value: '',
        ...params,
    };

    return `--s-scale: ${finalParams.value};`;
}
