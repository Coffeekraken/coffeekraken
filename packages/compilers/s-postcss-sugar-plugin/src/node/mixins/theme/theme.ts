import __SInterface from '@coffeekraken/s-interface';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme, { themeDefinition } from '../../utils/theme';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __themeColorObjToVars from '../../utils/themeColorObjToVars';

class ColorModifierInterface extends __SInterface {
  static definition = {
    saturate: {
      type: 'Number|String',
      default: 0
    },
    desaturate: {
      type: 'Number',
      default: 0
    },
    darken: {
      type: 'Number',
      default: 0
    },
    lighten: {
      type: 'Number',
      default: 0
    },
    spin: {
      type: 'Number',
      default: 0
    },
    alpha: {
      type: 'Number',
      default: 0
    },
    grayscale: {
      type: 'Boolean',
      default: false
    }
  };
}

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

      console.log(themesObj.dark.ui.button);

  // @ts-ignore
  const flattenedTheme = __flatten(themesObj[finalParams.theme]);
  let vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    const value = flattenedTheme[key];
    const varKey = key
      .replace(/\./gm, '-')
      .replace(/:/gm, '-')
      .replace(/\?/gm, '')
      .replace(/--/gm, '-');
    if (
      key.match(/^color\./) &&
      typeof value === 'string' &&
      value.match(/^--/)
    ) {
      return;
    } else {
      if (`${value}`.match(/:/)) {
        vars.push(`--s-theme-${varKey}: "${flattenedTheme[key]}";`);
      } else {
        vars.push(`--s-theme-${varKey}: ${flattenedTheme[key]};`);
      }
    }
  });

  Object.keys(themesObj[finalParams.theme].color).forEach((c) => {
    const colorVars = __themeColorObjToVars(c);
    vars = [...vars, ...colorVars];
  });

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
