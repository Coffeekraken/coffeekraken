import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
  static definition = {
    styles: {
      type: 'String[]',
      alias: 's'
    }
  };
}

export interface IPostcssSugarPluginUiFormClassesParams {
  colors: string[];
  styles: string[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiFormClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const styles = __theme().config('ui.form.styles');

  const finalParams: IPostcssSugarPluginUiFormClassesParams = {
    styles,
    ...params
  };

  const vars: string[] = [
    `
    @sugar.scope(bare) {
      .s-form-input {
        @sugar.ui.form.input()
      }
    }
  `
  ];

  vars.push('@sugar.scope(lnf) {');

  styles.forEach((style) => {
    const isDefaultStyle = style.match(/:default$/);
    style = style.split(':')[0];

    const styleCls = isDefaultStyle ? '' : `.s-form-input--${style}`;
    const cls = `.s-form-input${styleCls}`;

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.form
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" form
        * 
        * @example        html
        * <input class="${cls.trim()}" placeholder="Hello world" />
      */`);
    vars.push(
      [`${cls} {`, ` @sugar.ui.form.input($style: ${style});`, `}`].join('\n')
    );
  });

  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
