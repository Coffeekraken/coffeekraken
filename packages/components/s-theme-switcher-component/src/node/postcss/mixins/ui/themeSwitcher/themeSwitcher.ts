import __SInterface from '@coffeekraken/s-interface';

class postcssUiThemeSwitcherInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssUiThemeSwitcherParams {
    scope: ('bare' | 'lnf')[];
}

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
 * @example     css
 * .s-theme-switcher {
 *    @sugar.ui.themeSwitcher;
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
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

        `);

        vars.push(`

            .s-theme-switcher_dropdown-item {
                gap: sugar.margin(30);

                &.active {
                    @sugar.color (accent);

                    > .s-theme-switcher_theme-name {
                        color: sugar.color(accent, text);
                    }
                }

                .s-theme-switcher_dark-mode {
                    gap: sugar.margin(10);
                }

                .s-theme-switcher_switch {
                    @sugar.scale (0.7);
                }
            }

        `);
    }

    return vars;
}
