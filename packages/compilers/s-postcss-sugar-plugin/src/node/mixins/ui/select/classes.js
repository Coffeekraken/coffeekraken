import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
}
postcssSugarPluginUiFormSelectClassesInterface.definition = {
    styles: {
        type: 'String[]',
        default: ['default']
    }
};
export { postcssSugarPluginUiFormSelectClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ styles: ['default'] }, params);
    const vars = [
    //   `
    //     .s-select {
    //       @sugar.ui.select();
    //     }
    // `
    ];
    finalParams.styles.forEach((style) => {
        const isDefaultStyle = __theme().config('ui.select.defaultStyle') === style;
        const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
        const cls = `.s-select${styleCls}`;
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" select
        * 
        * @example        html
        * <select class="${cls.trim()}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push([`${cls} {`, ` @sugar.ui.select($style: ${style});`, `}`].join('\n'));
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSw4Q0FBK0MsU0FBUSxZQUFZOztBQUNoRSx5REFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztLQUNyQjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsOENBQThDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFdkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUVDLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFDaEIsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtJQUN2QixNQUFNO0lBQ04sa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QixRQUFRO0lBQ1IsSUFBSTtLQUNILENBQUM7SUFFRixXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ25DLE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUU1RSxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQztRQUM3RCxNQUFNLEdBQUcsR0FBRyxZQUFZLFFBQVEsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ2MsR0FBRzs7OzsrQ0FJZ0IsS0FBSzs7OzJCQUd6QixHQUFHLENBQUMsSUFBSSxFQUFFOzs7Ozs7O1NBTzVCLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxJQUFJLENBQ1AsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLDZCQUE2QixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3JFLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVwQixDQUFDIn0=