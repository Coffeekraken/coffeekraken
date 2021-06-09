import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiBadgeClassesParams {}

export { postcssSugarPluginUiBadgeClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiBadgeClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiBadgeClassesParams = {
    ...params
  };

  const vars: string[] = [];

    vars.push(`/**
        * @name           .s-badge
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-badge"] {
            @sugar.ui.badge(default, default);
        }
    `);

    vars.push(`/**
        * @name           .s-badge:square
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">square</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge:square">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-badge"][class*=":square"] {
            @sugar.ui.badge(square);
        }
    `);

    vars.push(`/**
        * @name           .s-badge:pill
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">pill</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge:pill">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-badge"][class*=":pill"] {
            @sugar.ui.badge(pill);
        }
    `);

    vars.push(`/**
        * @name           .s-badge:outline
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge:outline">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-badge"][class*=":outline"] {
            @sugar.ui.badge($style: outline);
        }
    `);


  replaceWith(vars);
}
