import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          blockquote
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface     ./blockquote
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "blockquote" UI component css.
 *
 * @param       {'solid'}                           [style'theme.ui.blockquote.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.blockquote.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.blockquote.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square'],
                default: __STheme.get('ui.blockquote.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBlockquoteParams {
    style: 'solid';
    shape: 'default' | 'square';
    scope: ('bare' | 'lnf' | 'shape' | 'vr')[];
}

export { postcssSugarPluginUiBlockquoteInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBlockquoteParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBlockquoteParams = {
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
        `);
    }

    switch (finalParams.style) {
        case 'solid':
        default:
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                            display: block;
                            padding-inline: sugar.padding(ui.blockquote.paddingInline);
                            padding-block: sugar.padding(ui.blockquote.paddingBlock);
                    `);
            }
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                            border-inline-start: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(current);
                            color: sugar.color(current, surfaceForeground);
                            background-color: sugar.color(current, surface);
                            @sugar.depth(ui.blockquote.depth);
                            font-size: sugar.scalable(1rem);

                            @sugar.font.family(quote);
                    `);
            }
            break;
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.blockquote.borderRadius);
                `);
                break;
        }
    }

    return vars;
}
