import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            theme: {
                type: 'String',
                default: __SSugarConfig.get('theme.theme'),
            },
            variant: {
                type: 'String',
                default: __SSugarConfig.get('theme.variant'),
            },
        };
    }
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           init
 * @as              @s.init
 * @namespace      node.mixin.init
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin is the one you usually call first in your css.
 * His job is to:
 * - Apply a reset.css to standardize the display across browser
 * - Generate the base theme variables like colors, etc...
 * - Generate all the font-faces needed
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @s.init
 *
 * @example        css
 * \@s.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: any;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = {
        theme: __STheme.theme,
        variant: __STheme.variant,
        ...(params ?? {}),
    };

    const cssArray = [
        '@s.reset;',
        `@s.theme.apply(${finalParams.variant}, ${finalParams.theme});`,
        '@s.font.faces;',
        '@s.selection;',
        `body { @s.color(main); }`,
        // '@s.autoload;', // Check if it's a good idea or not...
        // '@s.lnf.base;', called in the "@s.theme" mixin
    ];

    replaceWith(cssArray);
}
