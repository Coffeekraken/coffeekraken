import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTableInterface extends __SInterface {
}
postcssSugarPluginUiTableInterface.definition = {};
export { postcssSugarPluginUiTableInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
    width: 100%;
    font-size: sugar.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(current, border);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(current, border)
    }
    th {
        background-color: sugar.color(current, surface);
        font-weight: bold;
        vertical-align: middle;
    }
    td, th {
        padding-inline: sugar.theme(ui.table.paddingInline);
      padding-block: sugar.theme(ui.table.paddingBlock);

        @sugar.direction.rtl {
            text-align: right;
        }

    }

  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlgsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9