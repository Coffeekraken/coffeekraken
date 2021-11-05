import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiClassesInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginUiClassesInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @example         postcss
 * \@sugar.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.checkbox.classes;',
        '@sugar.ui.dropdown.classes;',
        '@sugar.ui.fsTree.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.navbar.classes;',
        '@sugar.ui.radio.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.terminal.classes;',
        '@sugar.ui.tooltip.classes;',
    ];

    return cssArray;
}
