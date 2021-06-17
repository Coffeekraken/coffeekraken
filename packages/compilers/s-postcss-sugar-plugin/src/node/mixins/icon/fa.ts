import __SInterface from '@coffeekraken/s-interface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __theme from '../../utils/theme';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/node/terminal/parseHtml';

import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

class postcssSugarPluginIconFaInterface extends __SInterface {
  static definition = {
      icon: {
          type: 'String',
          required: true
      },
      style: {
          type: 'String',
          values: ['solid','regular','light','duotone','brands'],
          default: 'solid'
      }
  };
}

export interface IPostcssSugarPluginIconFaParams {
    icon: string;
    style: string;
}

export { postcssSugarPluginIconFaInterface as interface };

let _isFaInitialised = false;

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginIconFaParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginIconFaParams = {
    icon: '',
    style: 'solid',
    ...params
  };

  const prefixes = {
    solid: 'fas',
    regular: 'far',
    light: 'fal',
    duotone: 'fad',
    brand: 'fab'
  }

  // register icons if first call
  if (!_isFaInitialised) {
    __fa.library.add(fas, fab);
    atRule.root().append(`
      @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
    `);
  }

  const iconDef = __fa.findIconDefinition({
      prefix: prefixes[finalParams.style],
      // @ts-ignore
      iconName: finalParams.icon
  });

  if (!iconDef) {
    console.log(__parseHtml(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
    return;
  }

  const vars: string[] = [];

  const fontWeight = {
      free: 900,
      solid: 900,
      regular: 400,
      light: 300,
      duotone: 900,
      brands: 400
  };

  if (finalParams.style === 'solid') finalParams.style = 'free';

  vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 5 ${__upperFirst(finalParams.style)}";
    font-weight: ${fontWeight[finalParams.style]};
    

    &:before {
      content: "\\${iconDef.icon[3]}";
      display: inline-block;
    }
  `)

  replaceWith(vars);
}
