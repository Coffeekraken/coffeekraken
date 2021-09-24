import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiTableClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiTableClassesParams {}

export { postcssSugarPluginUiTableClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTableClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTableClassesParams = {
        ...params,
    };

    const vars: string[] = [];

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
            @sugar.color(sugar.theme(ui.table.defaultColor));
            @sugar.ui.table;
        } 
        table {
          @sugar.rhythm.vertical {
            ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
          }
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
        @sugar.format.text {
          table {
              @sugar.color(${__theme().config('ui.table.defaultColor')});
              @sugar.ui.table;
          }
        } 
    `);

    replaceWith(vars);
}
