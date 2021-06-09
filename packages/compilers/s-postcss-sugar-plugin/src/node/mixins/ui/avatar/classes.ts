import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiAvatarClassesParams {}

export { postcssSugarPluginUiAvatarClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiAvatarClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiAvatarClassesParams = {
    ...params
  };

  const vars: string[] = [];

    vars.push(`/**
        * @name           .s-avatar
        * @namespace      sugar.css.ui.avatar
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" avatar
        * 
        * @example        html
        * <span class="s-avatar">
        *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-avatar"] {
            @sugar.ui.avatar(default);
        }
    `);

    vars.push(`/**
        * @name           .s-avatar:square
        * @namespace      sugar.css.ui.avatar
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">square</s-color>" avatar
        * 
        * @example        html
        * <span class="s-avatar:square">
        *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        [class*="s-avatar"][class*=":square"] {
            @sugar.ui.avatar(square);
        }
    `);

  replaceWith(vars);
}
