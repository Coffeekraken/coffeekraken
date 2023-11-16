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
class SSugarcssPluginUntilClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUntilClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = s_theme_1.default.current.get('media.queries');
    const states = s_theme_1.default.current.get('helpers.states');
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlnRCx5REFBUztBQUUxRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sTUFBTSxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXRELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7dUNBQ3FCLEtBQUs7Ozs7Ozs4RkFNa0QsS0FBSzs7O3dDQUczRCxLQUFLOzs7OztTQUtwQyxDQUNBLENBQUMsSUFBSSxDQUNGOytCQUNtQixLQUFLLDJIQUEySCxLQUFLLGNBQWMsS0FBSzs7Y0FFekssRUFDRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLEtBQUs7Ozs7OztnSEFNNEQsS0FBSzs7Ozs0Q0FJekUsS0FBSztpRkFDZ0MsS0FBSzs7Ozs7O1NBTTdFLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7Z0JB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