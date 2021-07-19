import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
  static definition = {
    styles: {
      type: 'String[]',
      default: ['default']
    }
  };
}

export interface IPostcssSugarPluginUiFormSelectClassesParams {
  styles: string[];
}

export { postcssSugarPluginUiFormSelectClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiFormSelectClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {

  const finalParams: IPostcssSugarPluginUiFormSelectClassesParams = {
    styles: ['default'],
    ...params
  };

  const vars: string[] = [
  //   `
  //     .s-select {
  //       @sugar.ui.select();
  //     }
  // `
  ];

  finalParams.styles.forEach((style) => {
    const isDefaultStyle = __theme().config('ui.select.defaultStyle') === style;

    const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
    const cls = `.s-select${styleCls}`;

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" select
        * 
        * @example        html
        * <select class="${cls.trim()}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(
      [`${cls} {`, ` @sugar.ui.select($style: ${style});`, `}`].join('\n')
    );
  });

  replaceWith(vars);

}
