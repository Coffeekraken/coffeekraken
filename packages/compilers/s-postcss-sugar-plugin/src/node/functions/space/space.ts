import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          space
 * @namespace     node.function.space
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a space value depending on your theme config
 *
 * @param       {String}        space      The space to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    padding: sugar.space(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            space: {
                type: 'String',
                values: Object.keys(__STheme.config('space')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginSpaceFunctionInterface as interface };

export interface IPostcssSugarPluginSpaceFunctionParams {
    space: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginSpaceFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginSpaceFunctionParams = {
        space: '',
        ...params,
    };

    const space = finalParams.space;

    if (__STheme.config('space')[space] === undefined) return space;

    const spaces = space.split(' ').map((s) => {
        const size = __STheme.config(`space.${s}`);
        if (!size) return size;
        return `var(${`--s-theme-space-${s}`}, ${size})`;
    });

    return spaces.join(' ');
}
