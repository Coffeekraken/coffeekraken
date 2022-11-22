import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name          classes
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
 * @example     css
 * @sugar.ui.table.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiTableClassesInterface extends __SInterface {
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
export { postcssSugarPluginUiTableClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Table
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/table
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice tables with ease.
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.table.classes;
        * 
        * .my-table {
        *   \@sugar.ui.table;
        * }
        * 
        * @cssClass     s-table            Apply the table lnf
        * 
        * @example        html       Default
        *   <table class="s-table s-mbe:30">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        *
        * @example      html        RTL Support
        * <div dir="rtl">
        *   <table class="s-table">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        * </div>
        * 
        * @example      html        Shapes
        *   <table class="s-table s-shape:square s-mbe:30">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        * 
        * <table class="s-table s-shape:pill">
       *       <tr>
       *           <th>${__faker.name.findName()}</th>
       *           <th>${__faker.name.findName()}</th>
       *           <th>${__faker.name.findName()}</th>
       *       </tr>
       *       <tr>
       *           <td>${__faker.name.findName()}</td>
       *           <td>${__faker.name.findName()}</td>
       *           <td>${__faker.name.findName()}</td>
       *       </tr>
       *       <tr>
       *           <td>${__faker.name.findName()}</td>
       *           <td>${__faker.name.findName()}</td>
       *           <td>${__faker.name.findName()}</td>
       *       </tr>
       *   </table>
        * 
        * @example      html        Scales
        ${['07', '1', '13', '16']
        .map((scale) => `
        *   <table class="s-table s-scale:${scale} s-mbe:30">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
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
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
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
                    @sugar.ui.table($scope: bare);
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
                .s-table {
                    @sugar.ui.table($scope: lnf);
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
        @sugar.format.text {
          table {
              @sugar.ui.table;
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
        @sugar.rhythm.vertical {
          table, .s-table {
              ${__STheme.jsObjectToCssProperties(__STheme.get('ui.table.rhythmVertical'))}
          }
        } 
    `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN2QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkErQlksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzBCQUd2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7MEJBR3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OzBCQVF2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7MEJBR3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7MEJBUXZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzBCQUd2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVB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