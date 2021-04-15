import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

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

export { postcssSugarPluginThemeinInterface as interface };

export default function (params = {}, atRule) {
  const theme = __sugarConfig('theme');
  if (!theme[params.name])
    throw new Error(
      `Sorry but the requested theme "<yellow>${params.name}</yellow>" does not exists...`
    );

  const flattenedTheme = __flatten(theme[params.name]);
  const vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    vars.push(`--s-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
  });

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = __postCss.parse(vars.join('\n'));

  atRule.replaceWith(AST);
}
