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
    name: '',
    ...params
  };

  if (!finalParams.name) return;

  const vars: string[] = [];

  // bare
  vars.push(`
        display: inline-block;
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
    `);

  // lnf
  vars.push(`
        color: sugar.color(ui, foreground);
        background-color: sugar.color(ui, surface);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui, border) solid 1px;
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &::placeholder {
          color: sugar.color(ui, placeholder);
        }

        &:hover {
          background-color: sugar.color(ui:hover, surface);
          color: sugar.color(ui:hover, foreground);
          border: sugar.color(ui:hover, border) solid 1px;
        }
        @sugar.state.focus {
          background-color: sugar.color(ui:focus, surface);
          color: sugar.color(ui:focus, foreground);
          border: sugar.color(ui:focus, border) solid 1px;
        }
        @sugar.state.active {
          background-color: sugar.color(ui:active, surface);
          color: sugar.color(ui:active, foreground);
          border: sugar.color(ui:active, border) solid 1px;
        }
  `);

  replaceWith(vars);
}
