import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static definition = {
        theme: {
            type: 'String',
            default: __SugarConfig.get('theme.theme'),
        },
        variant: {
            type: 'String',
            default: __SugarConfig.get('theme.variant'),
        },
    };
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           init
 * @namespace      mixins.init
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin is the one you usually call first in your css.
 * His job is to:
 * - Apply a reset.css to standardize the display across browser
 * - Generate the base theme variables like colors, etc...
 * - Generate all the font-faces needed
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }: { params: any; atRule: any; replaceWith: Function }) {
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme(${params.variant}, ${params.theme});`,
        '@sugar.font.faces;',
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
    ];

    replaceWith(cssArray);
}
