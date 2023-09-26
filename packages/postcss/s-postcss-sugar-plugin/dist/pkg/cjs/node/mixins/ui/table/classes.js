"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @as              @s.ui.table.classes
 * @namespace     node.mixin.ui.table
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the table classes
 *
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.table.classes
 *
 * @example     css
 * \@s.ui.table.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiTableClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'tf', 'vr'],
                default: ['bare', 'lnf', 'tf', 'vr'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiTableClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Table
        * @namespace          sugar.style.ui.table
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/table
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice tables with ease.
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.ui.table.classes;
        * 
        * .my-table {
        *   \@s.ui.table;
        * }
        * 
        * @cssClass     s-table            Apply the table lnf
        * 
        * @example        html       Default
        *   <table class="s-table s-mbe:30">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        *
        * @example      html        RTL Support
        * <div dir="rtl">
        *   <table class="s-table">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        * </div>
        * 
        * @example      html        Shapes
        *   <table class="s-table s-shape:square s-mbe:30">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        * 
        * <table class="s-table s-shape:pill">
       *       <tr>
       *           <th>${faker_1.default.name.findName()}</th>
       *           <th>${faker_1.default.name.findName()}</th>
       *           <th>${faker_1.default.name.findName()}</th>
       *       </tr>
       *       <tr>
       *           <td>${faker_1.default.name.findName()}</td>
       *           <td>${faker_1.default.name.findName()}</td>
       *           <td>${faker_1.default.name.findName()}</td>
       *       </tr>
       *       <tr>
       *           <td>${faker_1.default.name.findName()}</td>
       *           <td>${faker_1.default.name.findName()}</td>
       *           <td>${faker_1.default.name.findName()}</td>
       *       </tr>
       *   </table>
        * 
        * @example      html        Scales
        ${['07', '1', '13', '16']
        .map((scale) => `
        *   <table class="s-table s-scale:${scale} s-mbe:30">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `)
        .join('\n')}
        * 
        * @example      html        Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => `
        *   <table class="s-table s-color:${color} s-mbe:30">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-table
            * @namespace          sugar.style.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" table
            * 
            * @example        html
            * <table class="s-table">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
        vars.code(() => `
                .s-table {
                    @s.ui.table($scope: bare);
                }`, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(() => `/**
            * @name           s-table
            * @namespace          sugar.style.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) table
            * 
            * @example        html
            * <table class="s-table">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
        vars.code(() => `
                .s-table:not(.s-bare) {
                    @s.ui.table($scope: lnf);
                }`, { type: 'CssClass' });
    }
    vars.comment(() => `/**
        * @name           s-format:text
        * @namespace          sugar.style.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @s.format.text {
          table {
              @s.ui.table;
          }
        } 
    `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-rhythm:vertical
        * @namespace          sugar.style.ui.table
        * @type           CssClass
        * 
        * This class represent some tables in the s-rhythm:vertical scope
        * 
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <div class="s-rhythm:vertical">
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @s.rhythm.vertical {
          table, .s-table {
              ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.table.rhythmVertical'))}
          }
        } 
    `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN2QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNcUQsOERBQVM7QUFFL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFnQ1ksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzBCQUd2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7MEJBR3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OzBCQVF2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7MEJBR3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7MEJBUXZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzBCQUd2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7eUJBTXhCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lCQUN2Qixl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