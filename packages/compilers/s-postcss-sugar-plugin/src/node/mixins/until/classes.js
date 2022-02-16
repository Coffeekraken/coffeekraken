import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.until
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "until" classes that allows you to apply some display
 * styles like "hide", etc... only until a certain state is reached.
 * Supported states are:
 * - mounted: Apply only until the state of a webcomponent for example has been reached
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUntilClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUntilClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.config('media.queries');
    const states = __STheme.config('helpers.states');
    const vars = new CssVars();
    states.forEach(state => {
        vars.comment(() => `/**
            * @name          s-until:${state}
            * @namespace          sugar.css.until
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            .s-until.s-until--${state}:not(.s-until--sibling):not(.s-until--siblings):not(.s-until--parent):not(.s-until--grandparent):not(.s-until--ancestor)[${state}] {
                display: none;
            }`);
        vars.comment(() => `/**
            * @name          s-until:sibling:${state}
            * @namespace          sugar.css.until
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            *.${state} + .s-until.s-until--sibling.s-until--${state},
            *[${state}] + .s-until.s-until--sibling.s-until--${state} {
                display: none;
            }`);
        vars.comment(() => `/**
            * @name          s-until:siblings:${state}
            * @namespace          sugar.css.until
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            *.${state} ~  .s-until.s-until--siblings.s-until--${state},
            *[${state}] ~ .s-until.s-until--siblings.s-until--${state} {
                display: none;
            }`);
        vars.comment(() => `/**
            * @name          s-until:parent:${state}
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > .s-until.s-until--parent.s-until--${state} {
                display: unset;
            }
            *[${state}] > .s-until.s-until--parent.s-until--${state},
            *.${state} > .s-until.s-until--parent.s-until--${state} {
                display: none;
            }`);
        vars.comment(() => `/**
            * @name          s-until:grandparent:${state}
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > * > .s-until.s-until--grandparent.s-until--${state} {
                display: unset;
            }
            *[${state}] > * > .s-until.s-until--grandparent.s-until--${state},
            *.${state} > * > .s-until.s-until--grandparent.s-until--${state} {
                display: none;
            }`);
        vars.comment(() => `/**
            * @name          s-until:ancestor:${state}
            * @namespace          sugar.css.when
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            *:not([${state}]):not(.${state}) .s-until.s-until--ancestor.s-until--${state} {
                display: unset;
            }
            *[${state}] .s-until.s-until--ancestor.s-until--${state},
            *.${state} .s-until.s-until--ancestor.s-until--${state} {
                display: none;
            }`);
    });
    // Queries
    Object.keys(queries).forEach(query => {
        vars.comment(() => `/**
            * @name          s-until:media:${query}
            * @namespace          sugar.css.until
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `).code(`
            @sugar.media(${query}) {
                .s-until--media.s-until--${query} {
                    display: none !important;
                }
            }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVqRCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFFbkIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt1Q0FDcUIsS0FBSzs7Ozs7OzhGQU1rRCxLQUFLOzs7d0NBRzNELEtBQUs7Ozs7O1NBS3BDLENBQ0EsQ0FBQyxJQUFJLENBQUM7Z0NBQ2lCLEtBQUssNEhBQTRILEtBQUs7O2NBRXhKLENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLEtBQUs7Ozs7OztnSEFNNEQsS0FBSzs7Ozs0Q0FJekUsS0FBSztpRkFDZ0MsS0FBSzs7Ozs7O1NBTTdFLENBQ0EsQ0FBQyxJQUFJLENBQUM7Z0JBQ0MsS0FBSyx5Q0FBeUMsS0FBSztnQkFDbkQsS0FBSywwQ0FBMEMsS0FBSzs7Y0FFdEQsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLE9BQU8sQ0FDVCxHQUFHLEVBQUUsQ0FBQztnREFDOEIsS0FBSzs7Ozs7O3dIQU1tRSxLQUFLOzs7OzZDQUloRixLQUFLO29GQUNrQyxLQUFLOzs7Ozs7U0FNaEYsQ0FDQSxDQUFDLElBQUksQ0FBQztnQkFDQyxLQUFLLDJDQUEyQyxLQUFLO2dCQUNyRCxLQUFLLDJDQUEyQyxLQUFLOztjQUV2RCxDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzhDQUM0QixLQUFLOzs7Ozs7K0dBTTRELEtBQUs7Ozs7MkNBSXpFLEtBQUs7aUZBQ2lDLEtBQUs7Ozs7OztTQU03RSxDQUNBLENBQUMsSUFBSSxDQUFDO3FCQUNNLEtBQUssV0FBVyxLQUFLLHlDQUF5QyxLQUFLOzs7Z0JBR3hFLEtBQUsseUNBQXlDLEtBQUs7Z0JBQ25ELEtBQUssd0NBQXdDLEtBQUs7O2NBRXBELENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7bURBQ2lDLEtBQUs7Ozs7OztvSEFNNEQsS0FBSzs7OztnREFJekUsS0FBSztpRkFDNEIsS0FBSzs7Ozs7O1NBTTdFLENBQ0EsQ0FBQyxJQUFJLENBQUM7cUJBQ00sS0FBSyxXQUFXLEtBQUssa0RBQWtELEtBQUs7OztnQkFHakYsS0FBSyxrREFBa0QsS0FBSztnQkFDNUQsS0FBSyxpREFBaUQsS0FBSzs7Y0FFN0QsQ0FBQyxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnREFDOEIsS0FBSzs7Ozs7O2lIQU00RCxLQUFLOzs7OzZDQUl6RSxLQUFLO2dGQUM4QixLQUFLOzs7Ozs7U0FNNUUsQ0FDQSxDQUFDLElBQUksQ0FBQztxQkFDTSxLQUFLLFdBQVcsS0FBSyx5Q0FBeUMsS0FBSzs7O2dCQUd4RSxLQUFLLHlDQUF5QyxLQUFLO2dCQUNuRCxLQUFLLHdDQUF3QyxLQUFLOztjQUVwRCxDQUFDLENBQUM7SUFFWixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVU7SUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZDQUMyQixLQUFLOzs7Ozs7Ozs7OENBU0osS0FBSzs7Ozs7U0FLMUMsQ0FDQSxDQUFDLElBQUksQ0FBQzsyQkFDWSxLQUFLOzJDQUNXLEtBQUs7OztjQUdsQyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==