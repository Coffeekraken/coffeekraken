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
        '@sugar.ui.checkbox.classes;',
        '@sugar.ui.dropdown.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.navbar.classes;',
        '@sugar.ui.radio.classes;',
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
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any ui element.
       * This does apply the color only on the item itself and not on his childs...
       * 
       * @example       html
       * <label>
       *   Hello world
       *   <input type="text" class="s-input s-ui\:${colorName}" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-ui--${colorName}:not(.s-ui--deep) {
        @sugar.color.remap(ui, ${colorName});

        & > * > * {
          @sugar.color.remap(ui, main);
        }
      }
    `);
        cssArray.push(`
      /**
       * @name        s-ui:deep:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any ui element with all their childs
       * 
       * @example       html
       * <label class="s-ui\:deep\:${colorName}">
       *   Hello world
       *   <input type="text" class="s-input" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-ui--${colorName}.s-ui--deep {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBdUQ7SUFDekcsTUFBTSxRQUFRLEdBQUc7UUFDYiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IsK0JBQStCO1FBQy9CLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDOzs2QkFFTyxTQUFTOzs7O29FQUk4QixTQUFTLElBQUksU0FBUzs7Ozs7O3FEQU1yQyxTQUFTOzs7Ozs7ZUFNL0MsU0FBUztpQ0FDUyxTQUFTOzs7Ozs7S0FNckMsQ0FBQyxDQUFDO1FBRUMsUUFBUSxDQUFDLElBQUksQ0FBQzs7a0NBRVksU0FBUzs7OztvRUFJeUIsU0FBUyxJQUFJLFNBQVM7OztxQ0FHckQsU0FBUzs7Ozs7Ozs7ZUFRL0IsU0FBUztpQ0FDUyxTQUFTOztLQUVyQyxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=