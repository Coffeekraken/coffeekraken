import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as              @s.until.classes
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
 * @snippet         @s.until.classes
 *
 * @example        css
 * @s.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUntilClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUntilClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = __STheme.current.get('media.queries');
    const states = __STheme.current.get('helpers.states');
    const vars = new CssVars();
    states.forEach((state) => {
        vars.comment(() => `/**
            * @name          s-until:${state}
            * @namespace          sugar.style.helpers.until
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
            .s-until.s-until-${state}:not(.s-until-sibling):not(.s-until-siblings):not(.s-until-parent):not(.s-until-grandparent):not(.s-until-ancestor):is([${state}],[status="${state}"]) {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:sibling:${state}
            * @namespace          sugar.style.helpers.until
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
            *.${state} + .s-until.s-until-sibling.s-until-${state},
            *[${state}] + .s-until.s-until-sibling.s-until-${state},
            *[status="${state}"] + .s-until.s-until-sibling.s-until-${state} {
                display: none;
            }`, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name          s-until:siblings:${state}
            * @namespace          sugar.style.helpers.until
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
            *.${state} ~  .s-until.s-until-siblings.s-until-${state},
            *[${state}] ~ .s-until.s-until-siblings.s-until-${state},
            *[status="${state}"] ~ .s-until.s-until-siblings.s-until-${state} {
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
            *:not([status="${state}"]):not([${state}]):not(.${state}) > .s-until.s-until-parent.s-until-${state} {
                display: unset;
            }
            *[${state}] > .s-until.s-until-parent.s-until-${state},
            *[status="${state}"] > .s-until.s-until-parent.s-until-${state},
            *.${state} > .s-until.s-until-parent.s-until-${state} {
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
            *:not([status="${state}"]):not([${state}]):not(.${state}) > * > .s-until.s-until-grandparent.s-until-${state} {
                display: unset;
            }
            *[${state}] > * > .s-until.s-until-grandparent.s-until-${state},
            *[status="${state}"] > * > .s-until.s-until-grandparent.s-until-${state},
            *.${state} > * > .s-until.s-until-grandparent.s-until-${state} {
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
            *:not([status="${state}"]):not([${state}]):not(.${state}) .s-until.s-until-ancestor.s-until-${state} {
                display: unset;
            }
            *[${state}] .s-until.s-until-ancestor.s-until-${state},
            *[status="${state}"] .s-until.s-until-ancestor.s-until-${state},
            *.${state} .s-until.s-until-ancestor.s-until-${state} {
                display: none;
            }`, { type: 'CssClass' });
    });
    // Queries
    Object.keys(queries).forEach((query) => {
        vars.comment(() => `/**
            * @name          s-until:media:${query}
            * @namespace          sugar.style.helpers.until
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
            @s.media(${query}) {
                .s-until-media.s-until-${query} {
                    display: none !important;
                }
            }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt1Q0FDcUIsS0FBSzs7Ozs7OzhGQU1rRCxLQUFLOzs7d0NBRzNELEtBQUs7Ozs7O1NBS3BDLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7K0JBQ21CLEtBQUssMkhBQTJILEtBQUssY0FBYyxLQUFLOztjQUV6SyxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsrQ0FDNkIsS0FBSzs7Ozs7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