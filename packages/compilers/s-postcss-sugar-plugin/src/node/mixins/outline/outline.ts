import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __theme from '../../utils/theme';

class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static definition = {
        on: {
            type: 'Array<String>',
            values: ['hover', 'focus', 'always'],
            default: ['focus'],
        },
        where: {
            type: 'String',
            values: ['after', 'before', 'element'],
            default: 'after',
        },
    };
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };

export interface postcssSugarPluginStateOutlineMixinParams {
    on: ('hover' | 'focus' | 'always')[];
    where: 'after' | 'before' | 'element';
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
    params: Partial<postcssSugarPluginStateOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateOutlineMixinParams>{
        on: ['focus', 'hover'],
        where: 'after',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    let selector = `&:${finalParams.where}`;
    if (finalParams.where === 'element') selector = '&';

    vars.push(`

        position: relative;
        transition: sugar.theme(ui.outline.transition);

        ${
            selector !== '&'
                ? `
             ${selector} {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);
            border-radius: sugar.theme(ui.outline.borderRadius);
            transition: sugar.theme(ui.outline.transition);
        }
        `
                : ''
        }
    `);

    if (finalParams.on.indexOf('focus') !== -1) {
        vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    ${selector} {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
                }
            }
        `);
    }

    if (finalParams.on.indexOf('hover') !== -1) {
        if (finalParams.where === 'element') {
            vars.push(`
                &:hover {
                    box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                }
            `);
        } else {
            vars.push(`
                &:hover:${finalParams.where} {
                    box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                }
            `);
        }
    }

    if (finalParams.on.indexOf('always') !== -1) {
        vars.push(`
            ${selector} {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        `);
    }

    replaceWith(vars);
}
