import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           fit
 * @as              @s.fit
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a certain object-fit on your element
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.fit($1)
 *
 * @example        css
 * .my-element {
 *    \@s.fit(cover);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFitInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String',
                values: ['fill', 'contain', 'cover', 'none', 'abs'],
                default: 'fill',
            },
        };
    }
}

export interface IPostcssSugarPluginFitParams {
    size: 'fill' | 'contain' | 'cover' | 'none' | 'abs';
}

export { postcssSugarPluginFitInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFitParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFitParams = {
        size: 'fill',
        ...params,
    };

    const vars: string[] = [];

    switch (finalParams.size) {
        case 'cover':
            vars.push(`
                & {
                    object-fit: cover;
                }
            `);
            break;
        case 'contain':
            vars.push(`
                & {
                    object-fit: contain;
                }
            `);
            break;
        case 'none':
            vars.push(`
                & {
                    object-fit: none;
                }
            `);
            break;
        case 'abs':
            vars.push(`
                & {
                    position: absolute;
                    top: 0; left: 0;
                }
            `);
            break;
        case 'fill':
        default:
            vars.push(`
                & {
                    object-fit: fill;
                }
            `);
            break;
    }

    vars.push(`
        & {
            width: 100%; height: 100%;
        }
    `);

    return vars;
}
