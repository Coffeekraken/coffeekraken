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
        * @name           s-list--interactive
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>interactive</yellow>" list
        * 
        * @example        html
        * <ul class="s-list--interactive" />
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
      */`);
  vars.push([`.s-list--interactive {`, `@sugar.ui.list.interactive;`, `}`].join('\n'));

  // ul
  vars.push(`/**
        * @name           s-list--ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @example        html
        * <ul class="s-list--ul" />
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
      */`);
  vars.push([`.s-list--ul {`, `@sugar.ui.list.ul;`, `}`].join('\n'));

  // ul:icon
  vars.push(`/**
        * @name           s-list--ul.s-list--icon
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list--ul s-list--icon" />
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
      */`);
  vars.push([`.s-list--icon.s-list--ul {`, `@sugar.ui.list.ul(true);`, `}`].join('\n'));


  replaceWith(vars);
}
