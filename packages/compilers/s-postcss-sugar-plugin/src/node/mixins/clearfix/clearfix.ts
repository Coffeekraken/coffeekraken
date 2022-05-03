import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           clearfix
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a clearfix depending on your preference. Here's are the clearfix methods available:
 * - overflow (default)
 * - facebook
 * - float
 * - micro
 * - after
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.clearfix();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginClearfixInterface extends __SInterface {
    static get _definition() {
        return {
            clearfix: {
                type: 'String',
                values: ['overflow', 'facebook', 'micro', 'after'],
                default: __STheme.get('helpers.clearfix.default'),
            },
        };
    }
}

export interface IPostcssSugarPluginClearfixParams {
    clearfix: 'overflow' | 'facebook' | 'micro' | 'after';
}

export { postcssSugarPluginClearfixInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginClearfixParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginClearfixParams = {
        clearfix: 'overflow',
        ...params,
    };

    const vars = new CssVars();

    switch (finalParams.clearfix) {
        case 'facebook':
            vars.code(`
                display: table-cell;
                vertical-align: top;
                width: 10000px !important;
            `);
            break;
        case 'micro':
            vars.code(`
                zoom: 1;
                &:before,
                &:after {
                    content: ' ';
                    display: table;
                }
                &:after {
                    clear: both;
                }
            `);
            break;
        case 'after':
            vars.code(`
                &:after {
                    content: "";
                    clear: both;
                    display: table;
                }
            `);
            break;
        case 'overflow':
            vars.code(`
                overflow: hidden;
            `);
            break;
    }

    return vars;
}
