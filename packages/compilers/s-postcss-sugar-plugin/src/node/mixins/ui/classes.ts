import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginUiClassesInterface extends __SInterface {
  static definition = {};
}
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
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: any;
  atRule: any;
  replaceWith: Function;
}) {
  const cssArray = [
    '@sugar.ui.avatar.classes;',
    '@sugar.ui.button.classes;',
    '@sugar.ui.blockquote.classes;',
    '@sugar.ui.input.classes;',
    '@sugar.ui.label.classes;',
    '@sugar.ui.list.classes;',
    '@sugar.ui.tabs.classes;',
    '@sugar.ui.badge.classes;',
    '@sugar.ui.navbar.classes;',
    '@sugar.ui.select.classes;',
    '@sugar.ui.switch.classes;',
    '@sugar.ui.table.classes;',
    '@sugar.ui.terminal.classes;',
    '@sugar.ui.tooltip.classes;'
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
