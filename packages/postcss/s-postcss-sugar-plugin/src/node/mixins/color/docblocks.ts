import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDocblockColorsMixinInterface as interface };

/**
 * @__name           docblocks
 * @__namespace      node.mixin.color
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @__param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @__snippet         @sugar.color.docblocks
 *
 * @__example        css
 * \@sugar.color.docblocks;
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith }) {
    const vars = new CssVars();

    const colorsObj = __STheme.get('color');

    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            const colorValue = colorObj[modifier];
            vars.comment(() =>
                [
                    `/**`,
                    ` * @name 		    ${colorName}`,
                    ` * @modifier        ${modifier}`,
                    ` * @namespace          sugar.style.theme.${__STheme.name}.colors`,
                    ` * @type            color`,
                    ` * @platform       css`,
                    ` * @status         stable`,
                    ` *`,
                    ` * This is the "${colorName}${
                        modifier !== 'default' ? `-${modifier}` : ''
                    }" registered color`,
                    ` *`,
                    ` * @color 		${colorValue}`,
                    ` */`,
                ].join('\n'),
            );
        });
    });

    return vars;
}
