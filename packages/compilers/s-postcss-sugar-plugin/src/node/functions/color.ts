import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

class postcssSugarPluginColorInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      alias: 'n'
    },
    modifier: {
      type: 'String',
      alias: 'm'
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  name: string;
  modifier: string;
}

export default function (params: Partial<IPostcssSugarPluginColorParams> = {}) {
  const theme = __sugarConfig('theme');
  if (!theme.default.colors[params.name])
    throw new Error(
      `Sorry but the requested color "<yellow>${params.name}</yellow>" does not exists...`
    );

  let colorVar = `--s-colors-${params.name}`;
  if (params.modifier) colorVar += `-${params.modifier}`;
  else colorVar += '-default';

  return `var(${colorVar}, ${theme.default.colors[params.name].default})`;
}
