import __SInterface from '@coffeekraken/s-interface';
class postcssUiSpacesSelectorInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiSpacesSelectorInterface as interface };
/**
 * @name          spacesSelector
 * @namespace     ui.spacesSelector
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the clipbord copy style to any s-spacesSelector element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.spacesSelector($1);
 *
 * @example     css
 * .s-spaces-selector {
 *    @s.ui.spacesSelector;
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

            .s-spaces-selector_inner {
                border: 1px solid s.color(main, border);
                @s.border.radius;
            }

            .s-spaces-selector_clear {
                @s.ui.button ($lnf: text);
            }

            .s-spaces-selector_space {
                @s.transition (fast);

                &-margin {
                    box-shadow: 0px 0px 0px 25px s.color(accent, --alpha 0.05);

                    &:hover {
                        box-shadow: 0px 0px 0px 25px s.color(accent, --alpha 0.3);
                    }
                }
                &-padding {
                    box-shadow: inset 0px 0px 0px 25px
                        s.color(complementary, --alpha 0.05);

                    &:hover {
                        box-shadow: inset 0px 0px 0px 25px
                            s.color(complementary, --alpha 0.3);
                    }
                }
            }

            .s-spaces-selector_select {
                padding: s.padding(20) s.padding(10) !important;
                padding-inline-end: s.padding(40) !important;
                @s.ui.select();
                @s.scale (0.9);

                &-margin {
                    &-top {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        border-bottom: none !important;
                    }
                    &-right {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        border-left: none !important;
                    }
                    &-bottom {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-top: none !important;
                    }
                    &-left {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-right: none !important;
                    }
                }
                &-padding {
                    &-top {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-top: none !important;
                    }
                    &-right {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-right: none !important;
                    }
                    &-bottom {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        botder-bottom: none !important;
                    }
                    &-left {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        border-left: none !important;
                    }
                }
            }
        `);
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUVQLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtRkwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==