import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.when
 * @type           PostcssMixin
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
 * @example         postcss
 * \@sugar.when.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginActiveClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginActiveClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.config('media.queries');
    const states = __STheme.config('helpers.states');
    const vars = new CssVars();
    states.forEach(state => {
        vars.comment(() => `/**
            * @name          s-when:${state}
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        * @namespace          sugar.css.when
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        * @namespace          sugar.css.when
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    Object.keys(queries).forEach(query => {
        vars.comment(() => `/**
            * @name          s-when:media:${query}
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUczQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRW5CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7c0NBQ29CLEtBQUs7Ozs7Ozs2RkFNa0QsS0FBSzs7O3VDQUczRCxLQUFLOzs7OztTQUtuQyxDQUNBLENBQUMsSUFBSSxDQUFDOzhCQUNlLEtBQUssNEhBQTRILEtBQUssV0FBVyxLQUFLOzs7OEJBR3RKLEtBQUssdUhBQXVILEtBQUs7OEJBQ2pJLEtBQUssdUhBQXVILEtBQUs7O2NBRWpKLENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7OENBQzRCLEtBQUs7Ozs7OzsrR0FNNEQs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