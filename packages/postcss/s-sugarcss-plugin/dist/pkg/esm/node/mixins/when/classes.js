import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as              @s.when.classes
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
 * @return        {Css}         The generated css
 *
 * @snippet         @s.when.classes
 *
 * @example        css
 * @s.when.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginActiveClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginActiveClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.current.get('media.queries');
    const states = __STheme.current.get('helpers.states');
    const vars = new CssVars();
    states.forEach((state) => {
        vars.comment(() => `/**
            * @name          s-when:${state}
            * @namespace          sugar.style.helpers.when
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
            .s-when.s-when-${state}:not(.s-when-sibling):not(.s-when-siblings):not(.s-when-ancestor):not(.s-when-parent):not(.s-when-grandparent):not([${state}]):not(.${state}) {
                display: none;
            }
            .s-when.s-when-${state}:not(.s-when-sibling):not(.s-when-siblings):not(.s-when-ancestor):not(.s-when-parent):not(.s-when-grandparent)[${state}],
            .s-when.s-when-${state}:not(.s-when-sibling):not(.s-when-siblings):not(.s-when-ancestor):not(.s-when-parent):not(.s-when-grandparent).${state} {
                display: unset;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-when:sibling:${state}
            * @namespace          sugar.style.helpers.when
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
            *:not([${state}]):not(.${state}) + .s-when.s-when-sibling.s-when-${state} {
                display: none;
            }
            *[${state}] + .s-when.s-when-sibling.s-when-${state},
            *.${state} + .s-when.s-when-sibling.s-when-${state} {
                display: unset !important;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-when:siblings:${state}
            * @namespace          sugar.style.helpers.when
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
            *:not([${state}]):not(.${state}) ~ .s-when.s-when-siblings.s-when-${state} {
                display: none;
            }
            *[${state}] ~ .s-when.s-when-siblings.s-when-${state},
            *.${state} ~ .s-when.s-when-siblings.s-when-${state} {
                display: unset !important;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-when:parent:${state}
            * @namespace          sugar.style.helpers.when
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
            *:not([${state}]):not(.${state}) > .s-when.s-when-parent.s-when-${state} {
                display: none;
            }
            *[${state}] > .s-when.s-when-parent.s-when-${state},
            *.${state} > .s-when.s-when-parent.s-when-${state} {
                display: unset;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-when:grandparent:${state}
            * @namespace          sugar.style.helpers.when
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
            *:not([${state}]):not(.${state}) > * > .s-when.s-when-grandparent.s-when-${state} {
                display: none;
            }
            *[${state}] > * > .s-when.s-when-grandparent.s-when-${state},
            *.${state} > * > .s-when.s-when-grandparent.s-when-${state} {
                display: unset;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-when:ancestor:${state}
            * @namespace          sugar.style.helpers.when
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
            *:not([${state}]):not(.${state}) .s-when.s-when-ancestor.s-when-${state} {
                display: none;
            }
            *[${state}] .s-when.s-when-ancestor.s-when-${state},
            *.${state} .s-when.s-when-ancestor.s-when-${state} {
                display: unset;
            }`, { type: 'CssClass' });
    });
    vars.comment(() => `/**
        * @name          s-when:dark
        * @namespace          sugar.style.helpers.when
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
        .s-when-dark {
            display: none;
        }
        
        [theme$="dark"] .s-when-dark {
            display: inherit;
        }
        `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name          s-when:light
        * @namespace          sugar.style.helpers.when
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
        [theme$="dark"] .s-when-light {
            display: none;
        }
        `, { type: 'CssClass' });
    // Queries
    vars.comment(() => ``).code(`
            .s-when-media {
                display: none;
            }`, { type: 'CssClass' });
    Object.keys(queries).forEach((query) => {
        vars.comment(() => `/**
            * @name          s-when:media:${query}
            * @namespace          sugar.style.helpers.when
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
            @s.media(${query}) {
                .s-when-media.s-when-${query} {
                    display: unset;
                }
            }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXRELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7c0NBQ29CLEtBQUs7Ozs7Ozs2RkFNa0QsS0FBSzs7O3VDQUczRCxLQUFLOzs7OztTQUtuQyxDQUNBLENBQUMsSUFBSSxDQUNGOzZCQUNpQixLQUFLLHVIQUF1SCxLQUFLLFdBQVcsS0FBSzs7OzZCQUdqSixLQUFLLGtIQUFrSCxLQUFLOzZCQUM1SCxLQUFLLGtIQUFrSCxLQUFLOztjQUUzSSxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYs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