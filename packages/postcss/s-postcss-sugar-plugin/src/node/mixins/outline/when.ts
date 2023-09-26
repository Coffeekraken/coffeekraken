import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            when: {
                type: 'Array<String>',
                values: ['hover', 'focus', 'always'],
                default: ['focus'],
            },
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { postcssSugarPluginStateOutlineWhenMixinInterface as interface };

export interface postcssSugarPluginStateOutlineWhenMixinParams {
    when: ('hover' | 'focus' | 'always')[];
    color?: string;
}

/**
 * @name           when
 * @as              @s.outline.when
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
 * @snippet         @s.outline.when($1)
 *
 * @example        css
 * .myCoolItem {
 *      @s.outline.when(focus);
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
    params: Partial<postcssSugarPluginStateOutlineWhenMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateOutlineWhenMixinParams>{
        when: ['focus'],
        color: 'current',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    if (finalParams.when.indexOf('focus') !== -1) {
        vars.push(`
            &:focus,
            &:focus-within {
                &:not(:hover) {
                    @s.outline(${finalParams.color});
                }
            }
        `);
    }

    if (finalParams.when.indexOf('hover') !== -1) {
        vars.push(`
                &:hover {
                    @s.outline(${finalParams.color});
                }
            `);
    }

    if (finalParams.when.indexOf('always') !== -1) {
        vars.push(`
           & {
                @s.outline(${finalParams.color});
            }
        `);
    }

    return vars;
}
