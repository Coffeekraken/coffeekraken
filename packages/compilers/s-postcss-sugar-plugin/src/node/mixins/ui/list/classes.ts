import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiListClassesInterface extends __SInterface {
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

export interface IPostcssSugarPluginUiListClassesParams {
  colors: string[];
  styles: string[];
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiListClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const colors = __theme().config('ui.list.colors');
  const styles = __theme().config('ui.list.styles');

  const finalParams: IPostcssSugarPluginUiListClassesParams = {
    colors,
    styles,
    ...params
  };

  const vars: string[] = [];

  styles.forEach((style) => {
    const isDefaultStyle = style === 'default' || style.match(/:default$/);
    style = style.split(':')[0];

    finalParams.colors.forEach((colorName) => {
      const isDefaultColor =
        colorName === 'default' || colorName.match(/:default$/);
      colorName = colorName.split(':')[0];

      const styleCls = isDefaultStyle ? '' : `.s-list--${style}`;
      const colorCls = isDefaultColor ? '' : `.s-list--${colorName}`;
      const cls = isDefaultColor
        ? `.s-list${styleCls}`
        : `.s-list.${colorCls}${styleCls}`;

      vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" list with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <ul class="${cls.replace(/\./gm, ' ').trim()}" />
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
      */`);
      vars.push(
        [`${cls} {`, `  @sugar.style.apply(list-${style});`, `}`].join('\n')
      );
    });
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
