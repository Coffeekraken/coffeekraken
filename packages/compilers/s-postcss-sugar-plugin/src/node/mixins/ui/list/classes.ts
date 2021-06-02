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
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiListClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const colors = __theme().config('ui.list.colors');
  const styles = __theme().config('ui.list.styles');

  const finalParams: IPostcssSugarPluginUiListClassesParams = {
    colors,
    styles,
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
        * @name           s-list-ul,ul.s-list
        * @namespace      sugar.css.ui.list-ul
        * @type           CssClass
        * 
        * This class represent a "<yellow>ul</yellow>" list
        * 
        * @example        html
        * <ul class="s-list" />
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
      */`);
  vars.push([`ul.s-list,.s-list-ul {`, `@sugar.ui.list.ul;`, `}`].join('\n'));

  replaceWith(vars);
}
