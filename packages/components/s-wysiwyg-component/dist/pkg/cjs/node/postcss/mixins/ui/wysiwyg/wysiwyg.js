"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiWysiwygInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiWysiwygInterface;
/**
 * @name          wysiwyg
 * @namespace     ui.wysiwyg
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 * @private
 *
 * Apply the wysiwyg style to any s-wysiwyg element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.wysiwyg($1);
 *
 * @example     css
 * .s-wysiwyg {
 *    @s.ui.wysiwyg;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            @s.ui.input();

            .ce-inline-toolbar {
                @s.depth (100);
                padding: s.padding(10);
                @s.border.radius();
            }
        
            .codex-editor__redactor {
                padding-bottom: s.padding(60) !important;
            }
        
            .ce-inline-toolbar__buttons {
                gap: s.margin(10);
        
                button {
                    padding: s.padding(10) s.padding(20);
                    border: 1px solid s.color(main, --alpha 0.1);
                    @s.transition (fast);
                    @s.border.radius;
        
                    &:not(._color) {
                        background: s.color(accent, --alpha 0);
                    }
        
                    &._color {
                    }
        
                    &._color:hover,
                    &._color.active {
                        background: var(--s-wysiwyg-color);
                        color: s.color(main, foreground);
                    }
        
                    &:not(._color):hover {
                        background: s.color(main, --alpha 0.3);
                    }
                    &:not(._color).active {
                        background: s.color(main);
                        color: s.color(main, foreground);
        
                        * {
                            fill: s.color(main, foreground);
                        }
                        *[stroke] {
                            stroke: s.color(main, foreground);
                        }
                    }
                }
            }

        `);
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHlCQUEwQixTQUFRLHFCQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXFDLDhDQUFTO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBRVAsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBb0RMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN0VELDRCQTZFQyJ9