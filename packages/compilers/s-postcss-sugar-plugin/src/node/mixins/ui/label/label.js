import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiLabelInterface extends __SInterface {
}
postcssSugarPluginUiLabelInterface.definition = {
    style: {
        type: 'String',
        values: ['default'],
        default: __theme().config('ui.label.defaultStyle')
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiLabelInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: __theme().config('ui.label.defaultStyle'), scope: ['bare', 'lnf', 'style'] }, params);
    const vars = [];
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
    `);
    }
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: pointer;

      & > * {
        margin-inline-start: sugar.margin(20);
      }
    `);
    }
    // style
    if (finalParams.scope.indexOf('style') !== -1) {
        switch (finalParams.style) {
            case 'default':
            default:
                vars.push(`
            color: sugar.color(ui, text);
            `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ3BELDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztLQUNuRDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO0tBQ2hDO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFDaEQsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsSUFDMUIsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNULENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztLQVVULENBQUMsQ0FBQztLQUNKO0lBRUQsUUFBUTtJQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFFN0MsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3pCLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFUCxDQUFDLENBQUM7Z0JBQ1AsTUFBTTtTQUNUO0tBQ0Y7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9