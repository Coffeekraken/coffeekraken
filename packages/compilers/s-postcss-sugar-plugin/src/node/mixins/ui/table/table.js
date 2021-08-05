import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiTableInterface extends __SInterface {
}
postcssSugarPluginUiTableInterface.definition = {};
export { postcssSugarPluginUiTableInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
    width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(ui, border);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(ui, border)
    }
    th {
        background-color: sugar.color(ui, surface);
        font-weight: bold;
        vertical-align: middle;
    }
    td, th {
        padding: sugar.theme(ui.table.padding);
    }

    @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
    } 

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sa0NBQW1DLFNBQVEsWUFBWTs7QUFDcEQsNkNBQVUsR0FBRyxFQUNuQixDQUFDO0FBTUosT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXNCRix5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7O0dBRzlFLENBQUMsQ0FBQztJQUdILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVwQixDQUFDIn0=