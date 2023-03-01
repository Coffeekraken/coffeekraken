import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           depth
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.fix($1)
 *
 * @example        css
 * .my-element {
 *    \@sugar.fit(cover);
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
