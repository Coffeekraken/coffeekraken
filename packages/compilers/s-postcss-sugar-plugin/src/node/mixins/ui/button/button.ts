import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default', 'gradient', 'outlined', 'text'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiButtonParams {
  style: 'default' | 'gradient' | 'outlined' | 'text';
}

export { postcssSugarPluginUiButtonInterface as interface };
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiButtonParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiButtonParams = {
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  const dotPath =
    finalParams.style === 'default'
      ? `ui.button`
      : `ui.button.:${finalParams.style}?`;

  // lnf
  vars.push(`
    @sugar.ui.base(button);
  `);

  // bare
  vars.push(`
    @sugar.scope.bare {
      display: inline-block;
      cursor: pointer;
    }
  `);

  vars.push(`
    @sugar.scope.lnf {
    `);

  switch (finalParams.style) {
    case 'gradient':
      vars.push(`
          @sugar.gradient(ui, sugar.color(ui, --darken 20 --saturate 50), $angle: 90);

          &:hover, &:focus {
            @sugar.gradient(sugar.color(ui, --darken 20 --saturate 50), ui, $angle: 90);
          }
      `);

      break;
    case 'default':
    default:
      break;
  }
  vars.push('}');

  replaceWith(vars);
}
