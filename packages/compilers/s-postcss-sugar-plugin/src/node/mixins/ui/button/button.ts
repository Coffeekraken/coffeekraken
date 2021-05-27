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
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiButtonParams>;
  atRule: any;
  processNested: Function;
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

  // bare
  vars.push(`
    @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;
        padding: sugar.space(${__theme().config(`${dotPath}.padding`)});
      }
    `);

  // lnf
  vars.push(`
    @sugar.scope.lnf {
      border-radius: ${__themeVar(`${dotPath}.borderRadius`)};
      transition: ${__themeVar(`${dotPath}.transition`)};
  `);

  switch (finalParams.style) {
    // case 'outlined':
    //   vars.push(`
    //       background-color: sugar.color(ui, background);
    //       border-color: sugar.color(ui, border});
    //       color: sugar.color(ui, text);
    //       border-style: solid;
    //       border-width: ${1 / parseInt(defaultSize)}em;
    //       &:hover {
    //         background-color: sugar.color(ui:hover, background);
    //         border-color: sugar.color(ui:hover, border);
    //         color: sugar.color(ui:hover, text);
    //       }
    //       &:focus {
    //         background-color: sugar.color(ui:focus, background);
    //         border-color: sugar.color(ui:focus, border);
    //         color: sugar.color(ui:focus, text);
    //       }
    //     `);
    //   break;
    // case 'text':
    //   vars.push(`
    //       background-color: transparent;
    //       color: sugar.color(${finalParams.color});
    //       &:hover {
    //         background-color: sugar.color(${
    //           finalParams.textColor
    //             ? finalParams.textColor
    //             : `${finalParams.color}--10`
    //         });
    //       }
    //   `);
    //   break;
    case 'gradient':
      vars.push(`
          color: sugar.color(ui, text);
          @sugar.gradient(ui, sugar.color(ui, --darken 20 --saturate 50), $angle: 90);
          padding: ${__themeVar(`${dotPath}.padding`)};

          &:hover, &:focus {
            @sugar.gradient(sugar.color(ui, --darken 20 --saturate 50), ui, $angle: 90);
            color: sugar.color(ui, text);
          }
      `);

      break;
    case 'default':
    default:
      vars.push(`
        background-color: sugar.color(ui, background);
        color: sugar.color(ui, text);

        &:hover {
          background-color: sugar.color(ui:hover, background);
          color: sugar.color(ui:hover, text);
        }
        &:focus {
          background-color: sugar.color(ui:focus, background);
          color: sugar.color(ui:focus, text);
        }
      `);
      break;
  }
  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
