import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           disabled
 * @as              @s.disabled
 * @namespace      node.mixin.disabled
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a the disabled styling to any HTMLElement.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.disabled
 *
 * @example        css
 * .my-element {
 *    @s.disabled();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginDisabledParams {}

export { SSugarcssPluginDisabledInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginDisabledParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
        pointer-events: none;
        opacity: ${__STheme.current.cssVar(
            'helpers.disabled.opacity',
        )} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__STheme.current.cssVar(
                'helpers.disabled.opacity',
            )} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);

    return vars;
}
