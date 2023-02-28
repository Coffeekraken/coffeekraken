import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDocblockColorsMixinInterface as interface };

/**
 * @name           docblocks
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @sugar.color.docblocks
 * 
 * @example        css
 * \@sugar.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
