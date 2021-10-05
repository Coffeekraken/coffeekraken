import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiTableClassesInterface extends __SInterface {
}
postcssSugarPluginUiTableClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['solid'],
    },
    defaultColor: {
        type: 'String',
        default: __theme().config('ui.table.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.table.defaultStyle'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'tf', 'vr'],
        default: ['bare', 'lnf', 'tf', 'vr'],
    },
};
export { postcssSugarPluginUiTableClassesInterface as interface };
export default function ({ params, atRule, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultColor: 'ui', defaultStyle: 'solid', scope: [] }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Table
        * @namespace          sugar.css.ui
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
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-table${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} table style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <table class="s-table${style === finalParams.defaultStyle ? '' : `:${style}`} s-mbe:30">
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
            *   <table class="s-table${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent s-mbe:30">
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
            * `;
    })
        .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">RTL Support</h3>
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
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Scales</h3>
        *   <table class="s-table s-scale:15">
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
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`table\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
        *   <div class="s-format:text">
        *       <table>
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
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        const isDefaultStyle = __theme().config('ui.table.defaultStyle') === style;
        const styleCls = isDefaultStyle ? '' : `.s-table--${style}`;
        const cls = `.s-table${styleCls}`;
        vars.push(`/**
        * @name           s-table${isDefaultStyle ? '' : `:${style}`}
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" table
        * 
        * @example        html
        * <table class="s-table${isDefaultStyle ? '' : `:${style}`}">
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push(`
            ${cls} {
                @sugar.color(${finalParams.defaultColor});
                @sugar.ui.table($style: ${style}, $scope: '${finalParams.scope.join(',')}');
            }`);
    });
    vars.push(`/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.table
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        @sugar.format.text {
          table {
              @sugar.color(${__theme().config('ui.table.defaultColor')});
              @sugar.ui.table;
          }
        } 
    `);
    vars.push(`/**
        * @name           s-rhythm:vertical
        * @namespace      sugar.css.ui.table
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        @sugar.rhythm.vertical {
          table, .s-table {
              ${jsObjectToCssProperties(__theme().config('ui.table.rhythmVertical'))}
          }
        } 
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO0tBQ3JEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FDdkM7Q0FDSixDQUFDO0FBVU4sT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNi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