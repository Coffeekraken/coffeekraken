import __SInterface from '@coffeekraken/s-interface';
import { themeDefinition } from '../../utils/theme';
import __themeToVars from '../../utils/themeToVars';

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
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginThemeParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginThemeParams = {
    theme: '',
    ...params
  };

  const vars = __themeToVars(finalParams.theme);

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  replaceWith(vars); 
}
