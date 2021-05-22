import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormInputInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      required: true,
      default: 'default',
      alias: 'c'
    },
    style: {
      type: 'String',
      values: ['default'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiFormInputParams {
  color: string;
  style: 'default';
}

export { postcssSugarPluginUiFormInputInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiFormInputParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginUiFormInputParams = {
    color: 'default',
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  // bare
  vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${__themeVar('ui.form.padding')};
      }
    `);

  // lnf
  vars.push(`
      @sugar.scope.lnf {
  `);

  vars.push(`
      border-radius: ${__themeVar('ui.form.borderRadius')};
      transition: ${__themeVar('ui.form.transition')};
  `);

  switch (finalParams.style) {
    default:
      vars.push(`
          color: sugar.color(${finalParams.color}, text);
          padding: ${__themeVar('ui.form.padding')};
          border: sugar.color(${finalParams.color}) solid 1px;
          @sugar.depth(10);
          &:hover {
            @sugar.depth(20);
            border: sugar.color(${finalParams.color}) solid 2px;
          }
        `);
      break;
  }
  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
