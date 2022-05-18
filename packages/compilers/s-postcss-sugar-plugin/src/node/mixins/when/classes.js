import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "when" classes that allows you to apply some display
 * styles like "hide", etc... only when a certain state is reached.
 * Supported states are:
 * - mounted: Apply only when the state of a webcomponent for example has been reached
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.when.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginActiveClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginActiveClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.get('media.queries');
    const states = __STheme.get('helpers.states');
    const vars = new CssVars();
    states.forEach((state) => {
        vars.comment(() => `/**
            * @name          s-when:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when it has reached the state "${state}".
            * 
            * @example        html
            * <s-range class="s-when:${state}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent):not([${state}]):not(.${state}) {
                display: none;
            }
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent)[${state}],
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent).${state} {
                display: unset;
            }`);
        vars.comment(() => `/**
            * @name          s-when:sibling:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his previous sibling has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:sibling:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) + .s-when.s-when--sibling.s-when--${state} {
                display: none;
            }
            *[${state}] + .s-when.s-when--sibling.s-when--${state},
            *.${state} + .s-when.s-when--sibling.s-when--${state} {
                display: unset !important;
            }`);
        vars.comment(() => `/**
            * @name          s-when:siblings:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when one of his previous siblings has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:siblings:${state}">
            *       Display something when one of the previous siblings has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) ~ .s-when.s-when--siblings.s-when--${state} {
                display: none;
            }
            *[${state}] ~ .s-when.s-when--siblings.s-when--${state},
            *.${state} ~ .s-when.s-when--siblings.s-when--${state} {
                display: unset !important;
            }`);
        vars.comment(() => `/**
            * @name          s-when:parent:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct parent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:parent:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > .s-when.s-when--parent.s-when--${state} {
                display: none;
            }
            *[${state}] > .s-when.s-when--parent.s-when--${state},
            *.${state} > .s-when.s-when--parent.s-when--${state} {
                display: unset;
            }`);
        vars.comment(() => `/**
            * @name          s-when:grandparent:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct grandparent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:grandparent:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > * > .s-when.s-when--grandparent.s-when--${state} {
                display: none;
            }
            *[${state}] > * > .s-when.s-when--grandparent.s-when--${state},
            *.${state} > * > .s-when.s-when--grandparent.s-when--${state} {
                display: unset;
            }`);
        vars.comment(() => `/**
            * @name          s-when:ancestor:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct ancestor has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:ancestor:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) .s-when.s-when--ancestor.s-when--${state} {
                display: none;
            }
            *[${state}] .s-when.s-when--ancestor.s-when--${state},
            *.${state} .s-when.s-when--ancestor.s-when--${state} {
                display: unset;
            }`);
    });
    vars.comment(() => `/**
        * @name          s-when:dark
        * @namespace          sugar.style.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when the prefered color scheme is not dark.
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:dark">
        *       Display something when the color scheme is dark
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        .s-when--dark {
            display: none;
        }
        
        [theme$="dark"] .s-when--dark {
            display: inherit;
        }
        `);
    vars.comment(() => `/**
        * @name          s-when:light
        * @namespace          sugar.style.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when the prefered color scheme is not light.
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:light">
        *       Display something when the color scheme is light
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        [theme$="dark"] .s-when--light {
            display: none;
        }
        `);
    // Queries
    vars.comment(() => ``).code(`
            .s-when--media {
                display: none;
            }`);
    Object.keys(queries).forEach((query) => {
        vars.comment(() => `/**
            * @name          s-when:media:${query}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to show any HTMLElement for the passed query.
            * 
            * @example        html
            * <s-range class="s-when:media:${query}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            @sugar.media(${query}) {
                .s-when--media.s-when--${query} {
                    display: unset;
                }
            }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3NDQUNvQixLQUFLOzs7Ozs7NkZBTWtELEtBQUs7Ozt1Q0FHM0QsS0FBSzs7Ozs7U0FLbkMsQ0FDQSxDQUFDLElBQUksQ0FBQzs4QkFDZSxLQUFLLDRIQUE0SCxLQUFLLFdBQVcsS0FBSzs7OzhCQUd0SixLQUFLLHVIQUF1SCxLQUFLOzhCQUNqSSxLQUFLLHVIQUF1SCxLQUFLOztjQUVqSixDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzhDQUM0QixLQUFLOzs7Ozs7K0dBTTRELEtBQUs7Ozs7MkNBSXpFLEtBQUs7Z0ZBQ2dDLEtBQUs7Ozs7OztTQU01RSxDQUNBLENBQUMsSUFBSSxDQUFDO3FCQUNNLEtBQUssV0FBVyxLQUFLLHVDQUF1QyxLQUFLOzs7Z0JBR3RFLEtBQUssdUNBQXVDLEtBQUs7Z0JBQ2pELEtBQUssc0NBQXNDLEtBQUs7O2NBRWxELENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLEtBQUs7Ozs7Ozt1SEFNbUUsS0FBSzs7Ozs0Q0FJaEYsS0FBSzttRkFDa0MsS0FBSzs7Ozs7O1NBTS9FLENBQ0EsQ0FBQyxJQUFJLENBQUM7cUJBQ00sS0FBSyxXQUFXLEtBQUssd0NBQXdDLEtBQUs7OztnQkFHdkUsS0FBSyx3Q0FBd0MsS0FBSztnQkFDbEQsS0FBSyx1Q0FBdUMsS0FBSzs7Y0FFbkQsQ0FBQyxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs2Q0FDMkIsS0FBSzs7Ozs7OzRHQU0wRCxLQUFLOzs7OzBDQUl2RSxLQUFLO2dGQUNpQyxLQUFLOzs7Ozs7U0FNNUUsQ0FDQSxDQUFDLElBQUksQ0FBQztxQkFDTSxLQUFLLFdBQVcsS0FBSyxzQ0FBc0MsS0FBSzs7O2dCQUdyRSxLQUFLLHNDQUFzQyxLQUFLO2dCQUNoRCxLQUFLLHFDQUFxQyxLQUFLOztjQUVqRCxDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO2tEQUNnQyxLQUFLOzs7Ozs7aUhBTTBELEtBQUs7Ozs7K0NBSXZFLEtBQUs7Z0ZBQzRCLEtBQUs7Ozs7OztTQU01RSxDQUNBLENBQUMsSUFBSSxDQUFDO3FCQUNNLEtBQUssV0FBVyxLQUFLLCtDQUErQyxLQUFLOzs7Z0JBRzlFLEtBQUssK0NBQStDLEtBQUs7Z0JBQ3pELEtBQUssOENBQThDLEtBQUs7O2NBRTFELENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLEtBQUs7Ozs7Ozs4R0FNMEQsS0FBSzs7Ozs0Q0FJdkUsS0FBSztnRkFDK0IsS0FBSzs7Ozs7O1NBTTVFLENBQ0EsQ0FBQyxJQUFJLENBQUM7cUJBQ00sS0FBSyxXQUFXLEtBQUssc0NBQXNDLEtBQUs7OztnQkFHckUsS0FBSyxzQ0FBc0MsS0FBSztnQkFDaEQsS0FBSyxxQ0FBcUMsS0FBSzs7Y0FFakQsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7U0FRRixDQUFDLENBQUM7SUFFUCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLFVBQVU7SUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQzs7O2NBR2xCLENBQUMsQ0FBQztJQUVaLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs0Q0FDMEIsS0FBSzs7Ozs7Ozs7OzZDQVNKLEtBQUs7Ozs7O1NBS3pDLENBQ0EsQ0FBQyxJQUFJLENBQUM7MkJBQ1ksS0FBSzt5Q0FDUyxLQUFLOzs7Y0FHaEMsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=