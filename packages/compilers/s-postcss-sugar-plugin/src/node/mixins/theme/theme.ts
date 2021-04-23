import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';

class postcssSugarPluginThemeinInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      default: 'default',
      alias: 'n'
    }
  };
}

export interface IPostcssSugarPluginThemeParams {
  name: string;
}

export { postcssSugarPluginThemeinInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginThemeParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginThemeParams = {
    name: '',
    ...params
  };

  const theme = __sugarConfig('theme');
  if (!theme.themes[finalParams.name])
    throw new Error(
      `Sorry but the requested theme "<yellow>${finalParams.name}</yellow>" does not exists...`
    );

  // @ts-ignore
  const flattenedTheme = __flatten(theme.themes[finalParams.name]);
  const vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    vars.push(`--s-theme-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
  });

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
