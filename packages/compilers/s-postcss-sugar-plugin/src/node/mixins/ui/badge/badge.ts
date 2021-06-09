import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiBadgeInterface extends __SInterface {
  static definition = {
    shape: {
      type: 'String',
      values: ['default', 'square', 'pill']
    },
    style: {
        type: 'String',
        values: ['default', 'outline']
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
    ...params
  };

  const vars: string[] = [];

  // @todo          find a way to use sugar.space for paddings
  vars.push(`
    @sugar.scope.bare {
        display: inline-block;
        white-space: nowrap;
    }
    @sugar.scope.lnf {
        font-size: 0.75em;
        padding: ${__themeVar('ui.badge.padding')};
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
                color: sugar.color(accent, --darken 40);
                background-color: sugar.color(accent);
            ` : finalParams.style === 'outline' ? `
                color: sugar.color(accent, text);
                background-color: transparent;
                border: solid 1px sugar.color(accent, text);
            ` : ''
        : ''}

    }
  `);

  replaceWith(vars);
}
