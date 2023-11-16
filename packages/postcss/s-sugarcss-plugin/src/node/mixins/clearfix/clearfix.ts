import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           clearfix
 * @as              @s.clearfix
 * @namespace      node.mixin.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a clearfix depending on your preference. Here's are the clearfix methods available:
 * - overflow (default)
 * - facebook
 * - float
 * - micro
 * - after
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.clearfix($1)
 *
 * @example        css
 * .my-element {
 *    @s.clearfix();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginClearfixInterface extends __SInterface {
    static get _definition() {
        return {
            clearfix: {
                type: 'String',
                values: ['overflow', 'facebook', 'micro', 'after'],
                default: __STheme.current.get('helpers.clearfix.default'),
            },
        };
    }
}

export interface ISSugarcssPluginClearfixParams {
    clearfix: 'overflow' | 'facebook' | 'micro' | 'after';
}

export { SSugarcssPluginClearfixInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginClearfixParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginClearfixParams = {
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
