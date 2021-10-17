import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __theme from '../../utils/theme';

class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };

export interface postcssSugarPluginStateOutlineMixinParams {}

/**
 * @name           outline
 * @namespace      mixins.outline
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *      @sugar.outline();
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
    params: Partial<postcssSugarPluginStateOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateOutlineMixinParams>{
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`

        @keyframes s-outline-in {
            from {
                box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            }
            to {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        }

        position: relative;
        
        &:after {
            animation: s-outline-in sugar.theme(timing.default) sugar.theme(easing.default) forwards;
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            border-radius: sugar.theme(ui.outline.borderRadius);
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
        }
    `);

    replaceWith(vars);
}
