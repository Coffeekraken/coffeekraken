import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiThemeSwitcherInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.themeSwitcher.defaultStyle'),
            },
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
    style: 'solid';
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
        style: __STheme.get('ui.themeSwitcher.defaultStyle'),
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

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

            .s-theme-switcher__dropdown-item {
                gap: sugar.margin(30);

                &.active {
                    @sugar.color (accent);

                    > .s-theme-switcher__theme-name {
                        color: sugar.color(accent, text);
                    }
                }

                .s-theme-switcher__dark-mode {
                    gap: sugar.margin(10);
                }

                .s-theme-switcher__switch {
                    @sugar.scale (0.7);
                }
            }

        `);
                break;
        }
    }

    return vars;
}
