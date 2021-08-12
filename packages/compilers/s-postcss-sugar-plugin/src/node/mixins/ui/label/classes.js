import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
}
postcssSugarPluginUiLabelClassesInterface.definition = {};
export { postcssSugarPluginUiLabelClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    var _a;
    const finalParams = Object.assign({}, params);
    const vars = [];
    const defaultStyle = (_a = __theme().config('ui.label.defaultStyle')) !== null && _a !== void 0 ? _a : 'default';
    const styles = [
        'default'
    ];
    styles.forEach((style) => {
        let cls = `s-label`;
        if (style !== defaultStyle) {
            cls += `:${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.label
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" label
        * 
        * @example        html
        * <label class="${cls.replace(':', '\:')}">
        *   Hello world
        *   <input type="text" class="s-input" />
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace(':', '--')} {
          @sugar.ui.label(${style});
      } 
    `);
    });
    Object.keys(__theme().baseColors()).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-label:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any label
       * 
       * @example       html
       * <label class="s-label\:${colorName}">
       *   Hello world
       *   <input type="text" class="s-input" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-label--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHLEVBQ25CLENBQUM7QUFLSixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjs7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxZQUFZLEdBQUcsTUFBQSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsbUNBQUksU0FBUyxDQUFDO0lBRTVFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsU0FBUztLQUNWLENBQUM7SUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLElBQUksS0FBSyxLQUFLLFlBQVksRUFBRTtZQUMxQixHQUFHLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ2MsR0FBRzs7Ozt5REFJMEIsS0FBSzs7OzBCQUdwQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUXRDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQzs0QkFDRixLQUFLOztLQUU1QixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDOztnQ0FFa0IsU0FBUzs7OztvRUFJMkIsU0FBUyxJQUFJLFNBQVM7OztrQ0FHeEQsU0FBUzs7Ozs7Ozs7a0JBUXpCLFNBQVM7aUNBQ00sU0FBUzs7S0FFckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9