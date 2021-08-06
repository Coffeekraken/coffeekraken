import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiBadgeInterface extends __SInterface {
  static definition = {
    shape: {
      type: 'String',
      values: ['default', 'square', 'pill'],
      default: 'default'
    },
    style: {
        type: 'String',
        values: ['default', 'outline'],
        default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiBadgeParams {
    shape: 'default' | 'square' | 'pill';
    style: 'default' | 'outline';
}

export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiBadgeParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiBadgeParams = {
    shape: 'default',
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  // @todo          find a way to use sugar.space for paddings
  vars.push(`
        
      display: inline-block;
      white-space: nowrap;


      font-size: 0.75em;
      padding: sugar.theme(ui.badge.padding);
      vertical-align: baseline;

      ${finalParams.shape ?
          finalParams.shape === 'default' ? `
              border-radius: 0.5em;
          ` : finalParams.shape === 'square' ? `
              border-radius: 0;
          ` : finalParams.shape === 'pill' ? `
              border-radius: 99999px;
          ` : ''
      : ''}

      ${finalParams.style ?
          finalParams.style === 'default' ? `
              color: sugar.color(ui, --darken 40);
              background-color: sugar.color(ui);
          ` : finalParams.style === 'outline' ? `
              color: sugar.color(ui, text);
              background-color: transparent;
              border: solid 1px sugar.color(ui);
          ` : ''
      : ''}
  `);

  replaceWith(vars);
}
