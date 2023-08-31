import __SInterface from '@coffeekraken/s-interface';
class postcssUiCardInterface extends __SInterface {
    static get _definition() {
        return {
            direction: {
                type: 'String',
                values: [
                    'vertical',
                    'horizontal',
                    'vertical-reverse',
                    'horizontal-reverse',
                ],
                default: 'vertical',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'direction'],
                default: ['bare', 'lnf', 'direction'],
            },
        };
    }
}
export { postcssUiCardInterface as interface };
/**
 * @name          menu
 * @namespace     ui.card
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the menu lnf to any .s-menu element
 *
 * @snippet         @sugar.ui.card
 *
 * @example     css
 * .s-menu {
 *    @sugar.ui.card;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ direction: 'vertical', scope: ['bare', 'lnf', 'direction'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: flex;
            flex-direction: column;
            align-items: center;

            &.s-card--horizontal {
                
            }
            &.s-card--horizontal-reverse {
                
            }
            &.s-card--vertical-reverse {
                
            }

            ._content {
                align-items: unset;
            }

            ._ctas {
                display: flex;
                flex-direction: column;
            }

            .s-cta {
                display: block;
            }

            ._media {
                width: 100%;
            }
            
            ._img {
                aspect-ratio: 16/9;
                object-fit: cover;
                width: 100%;
                height: 100%;
            }

        `);
    }
    // direction
    if (finalParams.scope.indexOf('direction') !== -1) {
        switch (finalParams.direction) {
            case 'horizontal-reverse':
                vars.push(`
                    flex-direction: row-reverse;
                    max-width: none;

                    ._media {
                        align-self: stretch;
                        width: 50%;
                        height: 100%;
                    }

                    @sugar.media mobile {
                        flex-direction: column-reverse;
                    }
                `);
                break;
            case 'horizontal':
                vars.push(`
                    flex-direction: row;
                    max-width: none;
                    
                    ._media {
                        align-self: stretch;
                        width: 50%;
                        height: 100%;
                    }

                    @sugar.media mobile {
                        flex-direction: column;
                    }
            `);
                break;
            case 'vertical-reverse':
                vars.push(`
                    flex-direction: column-reverse;
                    align-items: flex-start;
                `);
                break;
            default:
            case 'vertical':
                vars.push(`
                        align-items: flex-start;
                    `);
                break;
        }
    }
    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            background: sugar.color(main, background);
            @sugar.border.radius(ui.card.borderRadius);
            @sugar.depth (ui.card.depth);
            
            ._img {
                @sugar.border.radius(ui.card.borderRadius);
            }

            ._content {
                padding-block: sugar.padding(ui.card.paddingBlock);
                padding-inline: sugar.padding(ui.card.paddingInline);
            }

            ._ctas {
                gap: sugar.margin(20);
            }

        `);
    }
    // wireframe
    vars.push(`
        @sugar.wireframe {
            @sugar.wireframe.background;
            @sugar.wireframe.border;
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTtJQUM3QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixVQUFVO29CQUNWLFlBQVk7b0JBQ1osa0JBQWtCO29CQUNsQixvQkFBb0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDO2FBQ3hDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVdELE9BQU8sRUFBRSxzQkFBc0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLFVBQVUsRUFDckIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsSUFDaEMsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBdUNULENBQUMsQ0FBQztLQUNOO0lBRUQsWUFBWTtJQUNaLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0MsUUFBUSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzNCLEtBQUssb0JBQW9CO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O2lCQWFULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxZQUFZO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7YUFhYixDQUFDLENBQUM7Z0JBRUMsTUFBTTtZQUNWLEtBQUssa0JBQWtCO2dCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixRQUFRO1lBQ1IsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQ0w7O3FCQUVDLENBQ0osQ0FBQztnQkFDRixNQUFNO1NBQ2I7S0FDSjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtCVCxDQUFDLENBQUM7S0FDTjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==