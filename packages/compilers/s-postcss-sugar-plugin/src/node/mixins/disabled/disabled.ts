import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           disabled
 * @namespace      node.mixins.disabled
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a the disabled styling to any HTMLElement.
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.disabled();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {};
    }
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
        opacity: ${__STheme.cssVar('helpers.disabled.opacity')} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__STheme.cssVar('helpers.disabled.opacity')} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);

    return vars;
}
