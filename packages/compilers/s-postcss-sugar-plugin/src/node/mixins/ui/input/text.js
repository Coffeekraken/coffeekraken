import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    style: {
        type: 'String',
        values: ['default'],
        default: __theme().config('ui.input.defaultStyle')
    },
    scope: {
        type: 'String',
        values: ['bare', 'lnf', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default', scope: [] }, params);
    const vars = [];
    vars.push(`
    @sugar.ui.base(input);
    color: sugar.color(ui, text) !important;
  `);
    // switch (finalParams.style) {
    //   default:
    //     break;
    // }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFHM0MsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ25CLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDbkQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO0tBQ2hDO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0dBR1QsQ0FBQyxDQUFDO0lBR0gsK0JBQStCO0lBQy9CLGFBQWE7SUFDYixhQUFhO0lBQ2IsSUFBSTtJQUVKLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVwQixDQUFDIn0=