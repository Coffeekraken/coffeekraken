import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';

/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    font-size: sugar.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.font'),
            },
        };
    }
}
export { postcssSugarPluginFontSizeInterface as interface };

export interface IPostcssSugarPluginFontSizeParams {
    name: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginFontSizeParams>;
}) {
    const finalParams: IPostcssSugarPluginFontSizeParams = {
        name: '',
        scalable: false,
        ...params,
    };

    const name = finalParams.name;

    if (__isValidUnitValue(name)) {
        if (finalParams.scalable) return `sugar.scalable(${name})`;
        return name;
    }

    return `sugar.theme(font.size.${name}, ${finalParams.scalable})`;
}
