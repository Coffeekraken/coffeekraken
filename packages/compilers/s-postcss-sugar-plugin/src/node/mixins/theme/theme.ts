import __SInterface from '@coffeekraken/s-interface';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginThemeinInterface extends __SInterface {
  static definition = {
    theme: themeDefinition
  };
}

export interface IPostcssSugarPluginThemeParams {
  theme: string;
}

export { postcssSugarPluginThemeinInterface as interface };
export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginThemeParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginThemeParams = {
    theme: '',
    ...params
  };

  const themesObj = __theme().themes;
  if (!themesObj[finalParams.theme])
    throw new Error(
      `Sorry but the requested theme "<yellow>${finalParams.theme}</yellow>" does not exists...`
    );

  // @ts-ignore
  const flattenedTheme = __flatten(themesObj[finalParams.theme]);
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
