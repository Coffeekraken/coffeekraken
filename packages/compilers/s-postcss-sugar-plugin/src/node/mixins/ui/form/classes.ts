import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
  static definition = {
    colors: {
      type: 'String[]',
      alias: 'c'
    },
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
  const colors = __theme().config('ui.form.colors');
  const styles = __theme().config('ui.form.styles');

  const finalParams: IPostcssSugarPluginUiFormClassesParams = {
    colors,
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

    finalParams.colors.forEach((colorName) => {
      const isDefaultColor = colorName.match(/:default$/);
      colorName = colorName.split(':')[0];

      const styleCls = isDefaultStyle ? '' : `.s-form-input--${style}`;
      const cls = isDefaultColor
        ? `.s-form-input${styleCls}`
        : `.s-form-input.s-form-input--${colorName}${styleCls}`;

      vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.form
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" form input with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <input class="${cls
          .replace(/\./gm, ' ')
          .trim()}" placeholder="Hello world" />
      */`);
      vars.push(
        [
          `${
            isDefaultColor
              ? `.s-form-input${styleCls}`
              : `.s-form-input.s-form-input--${colorName}${styleCls}`
          } {`,
          ` @sugar.ui.form.input($color: ${colorName}, $style: ${style});`,
          `}`
        ].join('\n')
      );
    });
  });

  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
