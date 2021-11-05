import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           depth
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFitInterface extends __SInterface {
    static definition = {
        size: {
            type: 'String',
            values: ['fill', 'contain', 'cover', 'none'],
            default: 'fill',
        },
    };
}

export interface IPostcssSugarPluginFitParams {
    size: 'fill' | 'contain' | 'cover' | 'none';
}

export { postcssSugarPluginFitInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFitParams>;
    atRule: any;
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
        &:not(img,video) {
                    object-fit: none;
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
    `);

    return vars;
}
