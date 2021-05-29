import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __theme from '../../utils/theme';

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
  processNested
}: {
  params: Partial<IPostcssSugarPluginFontFamilyParams>;
  atRule: any;
  processNested: Function;
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
          `${prop}: var(--s-theme-font-family-${finalParams.font}-${prop}, ${fontFamilyObj[prop]});`
        );
        break;
      default:
        break;
    }
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
