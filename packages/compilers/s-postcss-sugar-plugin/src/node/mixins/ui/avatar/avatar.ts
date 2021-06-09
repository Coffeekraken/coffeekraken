import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiAvatarInterface extends __SInterface {
  static definition = {
    shape: {
      type: 'String',
      values: ['default', 'square']
    }
  };
}

export interface IPostcssSugarPluginUiBadgeParams {
    shape: 'default' | 'square';
}

export { postcssSugarPluginUiAvatarInterface as interface };
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
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 1em;
        height: 1em;

        img {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
            max-width: 100%;
        }
    }
    @sugar.scope.lnf {
        ${finalParams.shape ?
            finalParams.shape === 'default' ? `
                border-radius: 99999999px;
            ` : finalParams.shape === 'square' ? `
                border-radius: 0;
            ` : ''
        : ''}
    }
  `);

  replaceWith(vars);
}
