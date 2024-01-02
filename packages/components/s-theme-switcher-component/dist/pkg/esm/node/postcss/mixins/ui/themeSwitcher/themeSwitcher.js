import __SInterface from '@coffeekraken/s-interface';
class postcssUiThemeSwitcherInterface extends __SInterface {
    static get _definition() {
        return {};
    }
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
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sK0JBQWdDLFNBQVEsWUFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUVQLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVMLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQkwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==