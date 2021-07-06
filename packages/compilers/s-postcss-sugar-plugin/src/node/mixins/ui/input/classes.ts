import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
  static definition = {
    styles: {
      type: 'String[]',
      default: ['default']
    }
  };
}

export interface IPostcssSugarPluginUiFormClassesParams {
  styles: string[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiFormClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {

  const finalParams: IPostcssSugarPluginUiFormClassesParams = {
    styles: ['default'],
    ...params
  };

  const vars: string[] = [
    `
      .s-input {
        @sugar.ui.input.text()
      }
  `
  ];

  finalParams.styles.forEach((style) => {
    const isDefaultStyle = __theme().config('ui.input.defaultStyle') === style;

    const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
    const cls = `.s-input${styleCls}`;

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" input
        * 
        * @example        html
        * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
      */`);
    vars.push(
      [`${cls} {`, ` @sugar.ui.input.text($style: ${style});`, `}`].join('\n')
    );
  });

  replaceWith(vars);

}
