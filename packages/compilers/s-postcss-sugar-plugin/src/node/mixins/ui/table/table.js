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
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(ui);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(ui)
    }
    th {
        font-weight: bold;
    }
    td, th {
        padding: sugar.theme(ui.table.padding);
    }

    &.s-rhythm--vertical,
    .s-rhythm--vertical & {
        ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
    } 

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sa0NBQW1DLFNBQVEsWUFBWTs7QUFDcEQsNkNBQVUsR0FBRyxFQUNuQixDQUFDO0FBTUosT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFvQkYseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7OztHQUc5RSxDQUFDLENBQUM7SUFHSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEIsQ0FBQyJ9