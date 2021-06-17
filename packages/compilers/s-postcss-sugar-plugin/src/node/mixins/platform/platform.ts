import __SInterface from '@coffeekraken/s-interface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __theme from '../../utils/theme';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';

class postcssSugarPluginAssetPlatformInterface extends __SInterface {
  static definition = {
      platform: {
          type: 'String',
          values: ['js','node','ts'],
        required: true
      }
  };
}

export interface IPostcssSugarPluginAssetPlatformParams {
    platform: string;
}

export { postcssSugarPluginAssetPlatformInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginAssetPlatformParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginAssetPlatformParams = {
    platform: '',
    ...params
  };

  const vars: string[] = [];

  if (!__fs.readFileSync(`${__dirname}/platforms/${finalParams.platform}.svg`)) {
      throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
  }
  const svgStr = __fs.readFileSync(`${__dirname}/platforms/${finalParams.platform}.svg`, 'utf8');

  vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
  `);

  replaceWith(vars);
}
