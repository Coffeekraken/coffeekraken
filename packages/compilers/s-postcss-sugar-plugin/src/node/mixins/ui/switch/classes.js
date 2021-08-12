import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchClassesMixinInterface.definition = {};
export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    var _a;
    const finalParams = Object.assign({}, params);
    const vars = [];
    const defaultStyle = (_a = __theme().config('ui.switch.defaultStyle')) !== null && _a !== void 0 ? _a : 'default';
    const styles = [
        'default'
    ];
    styles.forEach((style) => {
        let cls = `s-switch`;
        if (style !== defaultStyle) {
            cls += `--${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.switch
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" switch
        * 
        * @example        html
        * <label class="${cls.replace(/\./gm, ' ').trim()}">
        *   <input type="checkbox" />
        *   <div></div>
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls} {
        @sugar.ui.switch($style: ${style});
      }
    `);
    });
    Object.keys(__theme().baseColors()).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-switch:${colorName}
       * @namespace     sugar.css.ui.switch
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any switch
       * 
       * @example       html
       * <label class="s-switch\:${colorName}">
        *   <input type="checkbox" />
        *   <div></div>
        * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-switch--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSwrQ0FBZ0QsU0FBUSxZQUFZOztBQUNqRSwwREFBVSxHQUFHLEVBQ25CLENBQUM7QUFLSixPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjs7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxZQUFZLEdBQUcsTUFBQSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsbUNBQUksU0FBUyxDQUFDO0lBRTdFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsU0FBUztLQUNWLENBQUM7SUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQ3JCLElBQUksS0FBSyxLQUFLLFlBQVksRUFBRTtZQUMxQixHQUFHLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ2MsR0FBRzs7Ozt5REFJMEIsS0FBSzs7OzBCQUdwQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7O1NBUWhELEdBQUc7bUNBQ3VCLEtBQUs7O0tBRW5DLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUM7O2lDQUVtQixTQUFTOzs7O29FQUkwQixTQUFTLElBQUksU0FBUzs7O21DQUd2RCxTQUFTOzs7Ozs7OzttQkFRekIsU0FBUztpQ0FDSyxTQUFTOztLQUVyQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=