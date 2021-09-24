import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __theme from '../../utils/theme';

class postcssSugarPluginStateFocusOutlineMixinInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginStateFocusOutlineMixinInterface as interface };

export interface postcssSugarPluginStateFocusOutlineMixinParams {}

/**
 * @name           focus
 * @namespace      mixins.state
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to set any CSS elements display a custom outline
 * when it's in focus state
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *      @sugar.state.focusOutline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<postcssSugarPluginStateFocusOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateFocusOutlineMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    if (!__theme().config('ui.focusOutline.active')) return;

    vars.push(`

        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);
            border-radius: sugar.theme(ui.focusOutline.borderRadius);
            transition: sugar.theme(ui.focusOutline.transition);
        }

        &:focus-visible {
            &:not(:hover):not(:active):after {
                box-shadow: 0 0 0 sugar.theme(ui.focusOutline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        }
    `);

    replaceWith(vars);
}
