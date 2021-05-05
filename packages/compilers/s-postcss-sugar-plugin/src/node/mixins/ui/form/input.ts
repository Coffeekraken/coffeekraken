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
    textColor: {
      type: 'String',
      alias: 't'
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
  textColor: string;
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
    textColor: 'text',
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  const defaultSize = __theme().config('size.default');

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
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.textColor}, 30);
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
          padding: ${__themeVar('ui.form.padding')};
          &:hover {
            border-color: sugar.color(${finalParams.color}, 50);
          }
        `);
      break;
  }
  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
