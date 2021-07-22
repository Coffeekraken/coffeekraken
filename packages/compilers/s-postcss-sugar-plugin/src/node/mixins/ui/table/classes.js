import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiTableClassesInterface extends __SInterface {
}
postcssSugarPluginUiTableClassesInterface.definition = {};
export { postcssSugarPluginUiTableClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const cls = `s-table`;
    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <table class="${cls.trim()}">
        *   <tr>
        *       <th>Hello</th>
        *       </th>World</th>
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
      */
        .${cls} {
            @sugar.color.remap(ui, sugar.theme(ui.table.defaultColor));
            @sugar.ui.table;
        } 
        table.s-rhythm--vertical,
        .s-rhythm--vertical table {
            ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
        } 
    `);
    vars.push(`/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       </th>World</th>
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
        .s-format--text table {
            @sugar.color.remap(ui, ${__theme().config('ui.table.defaultColor')});
            @sugar.ui.table;
        } 
    `);
    Object.keys(__theme().config('color')).forEach((colorName) => {
        vars.push(`/**
        * @name           s-table:${colorName}
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple "<s-color="${colorName}">${colorName}</s-color> table
        * 
        * @example        html
        * <table class="s-table\:${colorName}">
        *   <tr>
        *       <th>Hello</th>
        *       </th>World</th>
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
      */
        .s-table--${colorName} {
            @sugar.color.remap(ui, ${colorName});
        } 
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQzNELG9EQUFVLEdBQUcsRUFDbkIsQ0FBQztBQU1KLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBRUMsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBR3hCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNjLEdBQUc7Ozs7Ozs7OzswQkFTTCxHQUFHLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQnpCLEdBQUc7Ozs7OztjQU1BLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztLQUVoRixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQStCdUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzs7S0FHekUsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDO29DQUNzQixTQUFTOzs7O3FEQUlRLFNBQVMsS0FBSyxTQUFTOzs7bUNBR3pDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFrQnhCLFNBQVM7cUNBQ1EsU0FBUzs7S0FFekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEIsQ0FBQyJ9