import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
}
postcssSugarPluginUiBadgeClassesInterface.definition = {};
export { postcssSugarPluginUiBadgeClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
        * @name           s-badge
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-badge {
            @sugar.ui.badge(default, default);
        }
    `);
    vars.push(`/**
        * @name           s-badge--square
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">square</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge--square">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--square {
            @sugar.ui.badge(square);
        }
    `);
    vars.push(`/**
        * @name           s-badge--pill
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">pill</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge--pill">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--pill {
            @sugar.ui.badge(pill);
        }
    `);
    vars.push(`/**
        * @name           s-badge--outline
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge--outline">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--outline {
            @sugar.ui.badge($style: outline);
        }
    `);
    Object.keys(__theme().config('color')).forEach((colorName) => {
        vars.push(`
        /**
         * @name        s-badge--${colorName}
         * @namespace     sugar.css.ui.badge
         * @type          CssClass
         * 
         * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any badge
         * 
         * @example       html
         * <a class="s-badge--${colorName}">I'm a cool ${colorName} badge</a>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-badge--${colorName} {
          @sugar.color.remap(ui, ${colorName});
        }
      `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHLEVBQ25CLENBQUM7QUFLSixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7U0FZTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7U0FZTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDOzttQ0FFbUIsU0FBUzs7OztzRUFJMEIsU0FBUyxJQUFJLFNBQVM7OztnQ0FHNUQsU0FBUyxnQkFBZ0IsU0FBUzs7Ozs7b0JBSzlDLFNBQVM7bUNBQ00sU0FBUzs7T0FFckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFHTCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9