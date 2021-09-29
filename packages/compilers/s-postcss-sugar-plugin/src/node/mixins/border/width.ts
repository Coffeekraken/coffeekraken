import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';

/**
 * @name          width
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.width(10);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
    static definition = {
        width: {
            type: 'Number|String',
            required: true,
            default: __theme().config('border.width.default'),
        },
    };
}

export interface IPostcssSugarPluginBorderwidthMixinParams {
    width: string | number;
}

export { postcssSugarPluginBorderwidthMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginBorderwidthMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginBorderwidthMixinParams = {
        width: 0,
        ...params,
    };

    const vars: string[] = [
        `border-width: sugar.border.width(${finalParams.width});`,
    ];
    replaceWith(vars);
}
