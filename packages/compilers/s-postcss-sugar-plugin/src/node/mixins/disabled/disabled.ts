import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';

/**
 * @name           depth
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginDisabledInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginDisabledParams {}

export { postcssSugarPluginDisabledInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginDisabledParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
        opacity: ${__themeVar('helpers.disabled.opacity')} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__themeVar('helpers.disabled.opacity')} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);

    replaceWith(vars);
}
