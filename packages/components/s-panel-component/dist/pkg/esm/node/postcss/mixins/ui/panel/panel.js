import __SInterface from '@coffeekraken/s-interface';
class postcssUiPanelInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiPanelInterface as interface };
/**
 * @name          panel
 * @namespace     ui.panel
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the panel style to any s-panel element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.panel($1);
 *
 * @example     css
 * .s-panel {
 *    @s.ui.panel;
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
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`

            .s-panel_container {
                transition: s.theme(ui.panel.transition);
                background: s.color(main, background);
                @s.depth (ui.panel.depth);
                @s.border.radius (ui.panel.borderRadius);
                @s.scrollbar;

                @s.media <=mobile {
                    width: 90vw;
                    min-width: auto;
                    max-width: auto;
                }
            }

            .s-panel_backdrop {
                background: s.color(main, surface, --alpha 0.6);
                transition: s.theme(ui.panel.transition);
                @s.ui.backdrop;
                z-index: 0;
            }

        `);
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sdUJBQXdCLFNBQVEsWUFBWTtJQUM5QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx1QkFBdUIsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUVQLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0F1QkwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==