import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

/**
 * @name           family
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.font.family(title);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontFamilyInterface extends __SInterface {
  static definition = {
    font: {
      type: 'String',
      values: Object.keys(__theme().config('font.family')),
      required: true
    }
  };
}

export interface IPostcssSugarPluginFontFamilyParams {
  font: string;
}

export { postcssSugarPluginFontFamilyInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginFontFamilyParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginFontFamilyParams = {
    font: 'default',
    ...params
  };

  const vars: string[] = [];

  const fontFamilyObj = __theme().config(`font.family.${finalParams.font}`);

  Object.keys(fontFamilyObj).forEach((prop) => {
    switch (prop) {
      case 'font-family':
      case 'font-weight':
      case 'font-style':
        vars.push(
          `${prop}: var(${__minifyVar(`--s-theme-font-family-${finalParams.font}-${prop}`)}, ${fontFamilyObj[prop]});`
        );
        break;
      default:
        break;
    }
  });

  replaceWith(vars);

}
