import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
    static definition = {
        when: {
            type: 'Array<String>',
            values: ['hover', 'focus', 'always'],
            default: ['focus'],
        },
    };
}
export { postcssSugarPluginStateOutlineWhenMixinInterface as interface };

export interface postcssSugarPluginStateOutlineWhenMixinParams {
    when: ('hover' | 'focus' | 'always')[];
}

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
    params: Partial<postcssSugarPluginStateOutlineWhenMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateOutlineWhenMixinParams>{
        when: ['focus'],
        ...(params ?? {}),
    };

    const vars: string[] = [];

    if (finalParams.when.indexOf('focus') !== -1) {
        vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    @sugar.outline;
                }
            }
        `);
    }

    if (finalParams.when.indexOf('hover') !== -1) {
        vars.push(`
                &:hover {
                    @sugar.outline;
                }
            `);
    }

    if (finalParams.when.indexOf('always') !== -1) {
        vars.push(`
           & {
                @sugar.outline;
            }
        `);
    }

    replaceWith(vars);
}
