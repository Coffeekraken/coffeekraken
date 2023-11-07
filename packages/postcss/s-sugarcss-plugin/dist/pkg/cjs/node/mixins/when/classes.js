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
class SSugarcssPluginActiveClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginActiveClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const queries = s_theme_1.default.get('media.queries');
    const states = s_theme_1.default.get('helpers.states');
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sTUFBTSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFOUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztzQ0FDb0IsS0FBSzs7Ozs7OzZGQU1rRCxLQUFLOzs7dUNBRzNELEtBQUs7Ozs7O1NBS25DLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7NkJBQ2lCLEtBQUssdUhBQXVILEtBQUssV0FBVyxLQUFLOzs7NkJBR2pKLEtBQUssa0hBQWtILEtBQUs7NkJBQzVILEtBQUssa0hBQWtILEtBQUs7O2NBRTNJLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzhDQUM0QixLQUFLOzs7Ozs7K0dBTTRELEtBQUs7Ozs7MkNBSXpFLEtBQUs7Z0ZBQ2dDLEtBQUs7Ozs7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