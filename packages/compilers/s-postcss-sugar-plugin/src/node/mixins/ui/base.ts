import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';

class postcssSugarPluginUiBaseInterface extends __SInterface {
  static definition = {
      name: {
          type: 'String',
          required: true
      }
  };
}

export interface IPostcssSugarPluginUiBaseParams {
    name: string;
}

export { postcssSugarPluginUiBaseInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiBaseParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiBaseParams = {
    ...params
  };

  if (!finalParams.name) return;

  const vars: string[] = [];

  // bare
  vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
      }
    `);

  // lnf
  vars.push(`
      @sugar.scope.lnf {
        color: sugar.color(ui, text);
        background-color: sugar.color(ui, surface);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui) solid 1px;
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &:hover {
          @sugar.depth(20);
          background-color: sugar.color(ui:hover, background);
          color: sugar.color(ui:hover, text);
        }
        &:focus {
          background-color: sugar.color(ui:focus, background);
          color: sugar.color(ui:focus, text);
        }

    }
  `);

  replaceWith(vars);
}
