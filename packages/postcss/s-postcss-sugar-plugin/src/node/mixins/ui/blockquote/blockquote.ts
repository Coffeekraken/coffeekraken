import __SInterface from '@coffeekraken/s-interface';

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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf'']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.ui.blockquote
 * 
 * @example       css
 * .my-element {
 *      \@sugar.ui.blockquote();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'color'],
                default: ['bare', 'lnf', 'color'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBlockquoteParams {
    scope: ('bare' | 'lnf')[];
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
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
        `);
    }

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
            font-size: sugar.scalable(1rem);
            @sugar.shape();
            @sugar.font.family(quote);
    `);
    }

    return vars;
}
