"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the toggle classes
 *
 * @param       {String[]}              [types=null]            The toggles type you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.toggle.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiToggleClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            types: {
                type: 'String[]',
                values: ['burger'],
                default: ['burger'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiToggleClassesInterface;
const fs_1 = require("@coffeekraken/sugar/fs");
function dependencies() {
    return {
        files: [`${(0, fs_1.__dirname)()}/toggle.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ types: ['burger'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Toggles
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/toggles
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a toggle
        * 
        ${finalParams.types
        .map((type) => {
        return ` * @cssClass     s-toggle:${type}}           Apply the ${type} toggle style`;
    })
        .join('\n')}
        * 
        ${finalParams.types
        .map((type) => {
        return ` * @example        html       ${type}
            * <label class="s-toggle:${type}"></label>`;
    })
        .join('\n')}
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    finalParams.types.forEach((type) => {
        vars.comment(() => `/**
            * @name           s-toggle:${type}
            * @namespace          sugar.style.ui.toggle
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${type}</s-color>" toggle
            * 
            * @example        html
            * <label class="s-toggle:${type}"></label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-toggle:${type} {
                @sugar.ui.toggle(${type});
            }
        `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUN0QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNc0QsK0RBQVM7QUFFaEUsK0NBQW1EO0FBQ25ELFNBQWdCLFlBQVk7SUFDeEIsT0FBTztRQUNILEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBQSxjQUFTLEdBQUUsWUFBWSxDQUFDO0tBQ3RDLENBQUM7QUFDTixDQUFDO0FBSkQsb0NBSUM7QUFFRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUNkLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7OztVQVdKLFdBQVcsQ0FBQyxLQUFLO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLDZCQUE2QixJQUFJLHlCQUF5QixJQUFJLGVBQWUsQ0FBQztJQUN6RixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFdBQVcsQ0FBQyxLQUFLO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLGlDQUFpQyxJQUFJO3VDQUNyQixJQUFJLFlBQVksQ0FBQztJQUM1QyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7eUNBQ3VCLElBQUk7Ozs7NkRBSWdCLElBQUk7Ozt1Q0FHMUIsSUFBSTs7OztXQUloQyxDQUNGLENBQUMsSUFBSSxDQUNGO3dCQUNZLElBQUk7bUNBQ08sSUFBSTs7U0FFOUIsRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNFRCw0QkEyRUMifQ==