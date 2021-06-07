import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    color: {
        type: 'String',
        default: 'accent'
    },
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ color: 'accent', style: 'default' }, params);
    const vars = [];
    vars.push(`
    @sugar.ui.base(form, ${finalParams.color});
    
    @sugar.state.hover {
      border: 1px solid sugar.color(accent)
    }
  `);
    // switch (finalParams.style) {
    //   default:
    //     break;
    // }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQU1yRCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ25CLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxRQUFRLEVBQ2YsS0FBSyxFQUFFLFNBQVMsSUFDYixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzJCQUNlLFdBQVcsQ0FBQyxLQUFLOzs7OztHQUt6QyxDQUFDLENBQUM7SUFHSCwrQkFBK0I7SUFDL0IsYUFBYTtJQUNiLGFBQWE7SUFDYixJQUFJO0lBRUosV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBCLENBQUMifQ==