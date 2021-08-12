import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiSwitchClassesMixinParams {}

export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiSwitchClassesMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiSwitchClassesMixinParams = {
    ...params
  };

  const vars: string[] = [];

  const defaultStyle = __theme().config('ui.switch.defaultStyle') ?? 'default';

  const styles = [
    'default'
  ];

  styles.forEach((style) => {
    let cls = `s-switch`;
    if (style !== defaultStyle) {
      cls += `--${style}`;
    }

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.switch
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" switch
        * 
        * @example        html
        * <label class="${cls.replace(/\./gm, ' ').trim()}">
        *   <input type="checkbox" />
        *   <div></div>
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls} {
        @sugar.ui.switch($style: ${style});
      }
    `);
  });

  Object.keys(__theme().baseColors()).forEach((colorName) => {
    vars.push(`
      /**
       * @name        s-switch:${colorName}
       * @namespace     sugar.css.ui.switch
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any switch
       * 
       * @example       html
       * <label class="s-switch\:${colorName}">
        *   <input type="checkbox" />
        *   <div></div>
        * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-switch--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
  });

  replaceWith(vars);
}
