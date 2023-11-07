"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @as              @s.ui.gauge.classes
 * @namespace     node.mixin.ui.gauge
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the gauge classes
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.gauge.classes
 *
 * @example       css
 * \@s.ui.gauge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiAvatarClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
exports.interface = SSugarcssPluginUiAvatarClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Gauge
        * @namespace          sugar.style.ui.gauge
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/gauge
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some gauge style on the s-gauge component.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * \\@s.ui.gauge.classes;
        * 
        * .my-gauge {
        *   \@s.ui.gauge;
        * }
        * 
        * @cssClass             s-gauge                Apply the gauge style
        * 
        * @example        html         Default
        * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
          * @name           s-gauge
          * @namespace          sugar.style.ui.gauge
          * @type           CssClass
          * 
          * This class represent a gauge
          * 
          * @example        html
          * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-gauge {
            @s.ui.gauge($scope: 'bare');
          }
      `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(() => `/**
        * @name           s-gauge
        * @namespace          sugar.style.ui.gauge
        * @type           CssClass
        * 
        * This class represent a gauge
        * 
        * @example        html
        * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
        .s-gauge:not(.s-bare) {
            @s.ui.gauge($scope: 'lnf');
        }
    `, { type: 'CssClass' });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBK0JULENBQ0EsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztRQWFWLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7Ozs7T0FJTCxFQUNLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztXQVlQLENBQ0YsQ0FBQyxJQUFJLENBQ0Y7Ozs7S0FJUCxFQUNPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBekdELDRCQXlHQyJ9