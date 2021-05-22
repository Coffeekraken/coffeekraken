import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';

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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  processNested
}: {
  params: any;
  atRule: any;
  processNested: Function;
}) {
  const cssArray = [
    // `@sugar.ui.button.classes;`,
    '@sugar.ui.form.classes;',
    '@sugar.ui.list.classes;'
  ];

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
