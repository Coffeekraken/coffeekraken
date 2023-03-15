import __SInterface from '@coffeekraken/s-interface';
class postcssUiSpacesSelectorInterface extends __SInterface {
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
 * @snippet         @sugar.ui.spacesSelector($1);
 *
 * @example     css
 * .s-spaces-selector {
 *    @sugar.ui.spacesSelector;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`            

            .s-spaces-selector_inner {
                border: 1px solid sugar.color(main, border);
                @sugar.border.radius;
            }

            .s-spaces-selector_space {
                @sugar.transition (fast);

                &-margin {
                    box-shadow: 0px 0px 0px 25px sugar.color(accent, --alpha 0.05);

                    &:hover {
                        box-shadow: 0px 0px 0px 25px sugar.color(accent, --alpha 0.3);
                    }
                }
                &-padding {
                    box-shadow: inset 0px 0px 0px 25px
                        sugar.color(complementary, --alpha 0.05);

                    &:hover {
                        box-shadow: inset 0px 0px 0px 25px
                            sugar.color(complementary, --alpha 0.3);
                    }
                }
            }

            .s-spaces-selector_select {
                padding: sugar.padding(20) sugar.padding(10) !important;
                padding-inline-end: sugar.padding(30) !important;
                @sugar.ui.select();
                @sugar.scale (0.9);

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
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztLQUNGO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQStFVCxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==