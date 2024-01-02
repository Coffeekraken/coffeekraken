import __SInterface from '@coffeekraken/s-interface';

class postcssUiHotkeysListInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiHotkeysListParams {}

export { postcssUiHotkeysListInterface as interface };

/**
 * @name          hotkeysList
 * @namespace     ui.hotkeysList
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the theme-switcher style to any s-theme-switcher element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.hotkeysList($1);
 *
 * @example     css
 * .s-hotkeys-list {
 *    @s.ui.hotkeysList;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiHotkeysListParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiHotkeysListParams = {
        ...params,
    };

    const vars: string[] = [];

    return vars;
}
