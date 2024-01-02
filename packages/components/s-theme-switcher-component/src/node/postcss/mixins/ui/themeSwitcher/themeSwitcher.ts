import __SInterface from '@coffeekraken/s-interface';

class postcssUiThemeSwitcherInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiThemeSwitcherParams {}

export { postcssUiThemeSwitcherInterface as interface };

/**
 * @name          themeSwitcher
 * @namespace     ui.themeSwitcher
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the theme-switcher style to any s-theme-switcher element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.themeSwitcher($1);
 *
 * @example     css
 * .s-theme-switcher {
 *    @s.ui.themeSwitcher;
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
    params: Partial<IPostcssUiThemeSwitcherParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiThemeSwitcherParams = {
        ...params,
    };

    const vars: string[] = [];

    // bare

    // lnf
    vars.push(`
            @s.scope 'lnf' {
        `);

    vars.push(`

            .s-theme-switcher_dropdown-item {
                gap: s.margin(30);

                &.active {
                    @s.color (accent);

                    > .s-theme-switcher_theme-name {
                        color: s.color(accent, text);
                    }
                }

                .s-theme-switcher_dark-mode {
                    gap: s.margin(10);
                }

                .s-theme-switcher_switch {
                    @s.scale (0.7);
                }
            }

        `);
    vars.push('}');

    return vars;
}
