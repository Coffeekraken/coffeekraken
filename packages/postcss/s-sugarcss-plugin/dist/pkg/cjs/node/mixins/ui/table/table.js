"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          table
 * @as              @s.ui.table
 * @namespace     node.mixin.ui.table
 * @type               PostcssMixin
 * @interface     ./table          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the table style to any element
 *
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.table
 *
 * @example     css
 * .my-table {
 *    @s.ui.table;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiTableInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiTableInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
    width: 100%;
    font-size: s.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-collapse: collapse;
    
    &, th, td {
    
    }
    th {
        vertical-align: middle;
    }
    td, th {
        padding-inline: s.padding(ui.table.paddingInline);
         padding-block: s.padding(ui.table.paddingBlock);

        @s.direction.rtl {
            text-align: right;
        }

    }

  `);
    vars.push('}');
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            @s.depth(ui.table.depth);
            position: relative;
            box-shadow: 0 0 0 s.border.width(ui.table.borderWidth) s.color(current, border);
            overflow: hidden;
            @s.shape();

            &, th, td {

            }
            th {
                background-color: s.color(current, surface);
                font-weight: bold;
            }
            td, th {
            
            }
        `);
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILE1BQU0sK0JBQWdDLFNBQVEscUJBQVk7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJMkMsb0RBQVM7QUFFckQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCWCxDQUFDLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUJMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEVELDRCQWdFQyJ9