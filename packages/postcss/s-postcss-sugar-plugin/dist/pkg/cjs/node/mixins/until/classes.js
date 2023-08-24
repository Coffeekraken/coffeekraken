"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           classes
 * @as              @sugar.until.classes
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
 * @snippet         @sugar.until.classes
 *
 * @example        css
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUntilClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginUntilClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = s_theme_1.default.get('media.queries');
    const states = s_theme_1.default.get('helpers.states');
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
            @sugar.media(${query}) {
                .s-until-media.s-until-${query} {
                    display: none !important;
                }
            }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUltRCw0REFBUztBQUU3RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3VDQUNxQixLQUFLOzs7Ozs7OEZBTWtELEtBQUs7Ozt3Q0FHM0QsS0FBSzs7Ozs7U0FLcEMsQ0FDQSxDQUFDLElBQUksQ0FDRjsrQkFDbUIsS0FBSywySEFBMkgsS0FBSyxjQUFjLEtBQUs7O2NBRXpLLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOytDQUM2QixLQUFLOzs7Ozs7Z0hBTTRELEtBQUs7Ozs7NENBSXpFLEtBQUs7aUZBQ2dDLEtBQUs7Ozs7OztTQU03RSxDQUNBLENBQUMsSUFBSSxDQUNGO2dCQUNJLEtBQUssdUNBQXVDLEtBQUs7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