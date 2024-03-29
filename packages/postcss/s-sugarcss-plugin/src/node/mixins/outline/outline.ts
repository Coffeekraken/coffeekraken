import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { SSugarcssPluginStateOutlineMixinInterface as interface };

export interface SSugarcssPluginStateOutlineMixinParams {
    color?: string;
}

/**
 * @name           outline
 * @as              @s.outline
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@s.outline(always)`
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.outline
 *
 * @example        css
 * .myCoolItem {
 *      @s.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<SSugarcssPluginStateOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginStateOutlineMixinParams>{
        color: 'current',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`

        @keyframes s-outline-in-${finalParams.color} {
            from {
                outline: 0px solid s.color(${finalParams.color}, --alpha 0);
            }
            to {
                outline: 10px solid s.color(${finalParams.color}, --alpha 0.2);
            }
        }

        animation: s-outline-in-${finalParams.color} .1s ease-out forwards;    
    `);

    return vars;
}
