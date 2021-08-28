import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginUiClassesInterface extends __SInterface {
}
postcssSugarPluginUiClassesInterface.definition = {};
export { postcssSugarPluginUiClassesInterface as interface };
/**
 * @name           classes
 * @namespace      mixins.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @example         postcss
 * \@sugar.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.navbar.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.terminal.classes;',
        '@sugar.ui.tooltip.classes;',
    ];
    Object.keys(__theme().baseColors()).forEach((colorName) => {
        cssArray.push(`
      /**
       * @name        s-ui:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any ui element
       * 
       * @example       html
       * <label class="s-ui\:${colorName}">
       *   Hello world
       *   <input type="text" class="s-input" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-ui--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBdUQ7SUFDekcsTUFBTSxRQUFRLEdBQUc7UUFDYiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLCtCQUErQjtRQUMvQiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDOzs2QkFFTyxTQUFTOzs7O29FQUk4QixTQUFTLElBQUksU0FBUzs7OytCQUczRCxTQUFTOzs7Ozs7OztlQVF6QixTQUFTO2lDQUNTLFNBQVM7O0tBRXJDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==