import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            where: {
                type: 'String',
                values: ['after', 'before', 'element'],
                default: 'after',
            },
        };
    }
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };

export interface postcssSugarPluginStateOutlineMixinParams {
    where: 'after' | 'before' | 'element';
}

/**
 * @name           outline
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.outline
 * 
 * @example        css
 * .myCoolItem {
 *      @sugar.outline();
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
    params: Partial<postcssSugarPluginStateOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateOutlineMixinParams>{
        where: 'after',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    let sel = `&:${finalParams.where}`;
    if (finalParams.where === 'element') sel = '&';

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
        
        ${sel} {
            animation: s-outline-in sugar.theme(timing.default) sugar.theme(easing.default) forwards;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            
            ${
                finalParams.where !== 'element'
                    ? `
                border-radius: sugar.border.radius(ui.outline.borderRadius);
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
            `
                    : ''
            }
        }
    `);

    return vars;
}
