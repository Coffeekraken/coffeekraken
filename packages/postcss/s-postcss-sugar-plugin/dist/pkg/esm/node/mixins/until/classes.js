import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixin.until
 * @type           PostcssMixin
 * @interface    ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "until" classes that allows you to apply some display
 * styles like "hide", etc... only until a certain state is reached.
 * Supported states are:
 * - mounted: Apply only until the state of a webcomponent for example has been reached
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUntilClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUntilClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.get('media.queries');
    const states = __STheme.get('helpers.states');
    const vars = new CssVars();
    states.forEach((state) => {
        vars.comment(() => `/**
            * @name          s-until:${state}
            * @namespace          sugar.style.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until it has reached the state "${state}".
            * 
            * @example        html
            * <s-range class="s-until:${state}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-until.s-until--${state}:not(.s-until--sibling):not(.s-until--siblings):not(.s-until--parent):not(.s-until--grandparent):not(.s-until--ancestor)[${state}] {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:sibling:${state}
            * @namespace          sugar.style.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until his previous sibling has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:sibling:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *.${state} + .s-until.s-until--sibling.s-until--${state},
            *[${state}] + .s-until.s-until--sibling.s-until--${state} {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:siblings:${state}
            * @namespace          sugar.style.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until one of his previous siblings has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:siblings:${state}">
            *       Display something until one of the previous siblings has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *.${state} ~  .s-until.s-until--siblings.s-until--${state},
            *[${state}] ~ .s-until.s-until--siblings.s-until--${state} {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:parent:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct parent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:parent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > .s-until.s-until--parent.s-until--${state} {
                display: unset;
            }
            *[${state}] > .s-until.s-until--parent.s-until--${state},
            *.${state} > .s-until.s-until--parent.s-until--${state} {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:grandparent:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct grandparent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:grandparent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > * > .s-until.s-until--grandparent.s-until--${state} {
                display: unset;
            }
            *[${state}] > * > .s-until.s-until--grandparent.s-until--${state},
            *.${state} > * > .s-until.s-until--grandparent.s-until--${state} {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:ancestor:${state}
            * @namespace          sugar.style.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct ancestor has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:ancestor:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) .s-until.s-until--ancestor.s-until--${state} {
                display: unset;
            }
            *[${state}] .s-until.s-until--ancestor.s-until--${state},
            *.${state} .s-until.s-until--ancestor.s-until--${state} {
                display: none;
            }`, { type: 'CssClass' });
    });
    // Queries
    Object.keys(queries).forEach((query) => {
        vars.comment(() => `/**
            * @name          s-until:media:${query}
            * @namespace          sugar.style.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to show any HTMLElement for the passed query.
            * 
            * @example        html
            * <s-range class="s-until:media:${query}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            @sugar.media(${query}) {
                .s-until--media.s-until--${query} {
                    display: none !important;
                }
            }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7dUNBQ3FCLEtBQUs7Ozs7Ozs4RkFNa0QsS0FBSzs7O3dDQUczRCxLQUFLOzs7OztTQUtwQyxDQUNBLENBQUMsSUFBSSxDQUNGO2dDQUNvQixLQUFLLDRIQUE0SCxLQUFLOztjQUV4SixFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsrQ0FDNkIsS0FBSzs7Ozs7O2dIQU00RCxLQUFLOzs7OzRDQUl6RSxLQUFLO2lGQUNnQyxLQUFLOzs7Ozs7U0FNN0UsQ0FDQSxDQUFDLElBQUksQ0FDRjtnQkFDSSxLQUFLLHlDQUF5QyxLQUFLO2dCQUNuRCxLQUFLLDBDQUEwQyxLQUFLOztjQUV0RCxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnREFDOEIsS0FBSzs7Ozs7O3dIQU1tRSxLQUFLOzs7OzZDQUloRixLQUFLO29GQUNrQyxLQUFLOzs7Ozs7U0FNaEYsQ0FDQSxDQUFDLElBQUksQ0FDRjtnQkFDSSxLQUFLLDJDQUEyQyxLQUFLO2dCQUNyRCxLQUFLLDJDQUEyQyxLQUFLOztjQUV2RCxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs4Q0FDNEIsS0FBSzs7Ozs7OytHQU00RCxLQUFLOzs7OzJDQUl6RSxLQUFLO2lGQUNpQyxLQUFLOzs7Ozs7U0FNN0UsQ0FDQSxDQUFDLElBQUksQ0FDRjtxQkFDUyxLQUFLLFdBQVcsS0FBSyx5Q0FBeUMsS0FBSzs7O2dCQUd4RSxLQUFLLHlDQUF5QyxLQUFLO2dCQUNuRCxLQUFLLHdDQUF3QyxLQUFLOztjQUVwRCxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzttREFDaUMsS0FBSzs7Ozs7O29IQU00RCxLQUFLOzs7O2dEQUl6RSxLQUFLO2lGQUM0QixLQUFLOzs7Ozs7U0FNN0UsQ0FDQSxDQUFDLElBQUksQ0FDRjtxQkFDUyxLQUFLLFdBQVcsS0FBSyxrREFBa0QsS0FBSzs7O2dCQUdqRixLQUFLLGtEQUFrRCxLQUFLO2dCQUM1RCxLQUFLLGlEQUFpRCxLQUFLOztjQUU3RCxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnREFDOEIsS0FBSzs7Ozs7O2lIQU00RCxLQUFLOzs7OzZDQUl6RSxLQUFLO2dGQUM4QixLQUFLOzs7Ozs7U0FNNUUsQ0FDQSxDQUFDLElBQUksQ0FDRjtxQkFDUyxLQUFLLFdBQVcsS0FBSyx5Q0FBeUMsS0FBSzs7O2dCQUd4RSxLQUFLLHlDQUF5QyxLQUFLO2dCQUNuRCxLQUFLLHdDQUF3QyxLQUFLOztjQUVwRCxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVO0lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZDQUMyQixLQUFLOzs7Ozs7Ozs7OENBU0osS0FBSzs7Ozs7U0FLMUMsQ0FDQSxDQUFDLElBQUksQ0FDRjsyQkFDZSxLQUFLOzJDQUNXLEtBQUs7OztjQUdsQyxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=