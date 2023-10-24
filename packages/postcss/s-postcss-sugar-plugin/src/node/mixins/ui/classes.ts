import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiClassesInterface as interface };

/**
 * @name           classes
 * @as              @s.ui.classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @snippet         @s.ui.classes
 *
 * @example        css
 * @s.ui.classes;
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
        '@s.ui.avatar.classes;',
        '@s.ui.backdrop.classes;',
        '@s.ui.badge.classes;',
        '@s.ui.blockquote.classes;',
        '@s.ui.button.classes;',
        '@s.ui.checkbox.classes;',
        '@s.ui.dropdown.classes;',
        '@s.ui.fsTree.classes;',
        '@s.ui.input.classes;',
        '@s.ui.inputContainer.classes;',
        '@s.ui.label.classes;',
        '@s.ui.list.classes;',
        '@s.ui.loader.classes;',
        '@s.ui.media.classes;',
        '@s.ui.radio.classes;',
        '@s.ui.range.classes;',
        '@s.ui.select.classes;',
        '@s.ui.switch.classes;',
        '@s.ui.table.classes;',
        '@s.ui.tabs.classes;',
        '@s.ui.toggle.classes;',
        '@s.ui.tooltip.classes;',
    ];

    return cssArray;
}
