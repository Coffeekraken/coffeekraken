import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiLabelClassesParams {}

export { postcssSugarPluginUiLabelClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiLabelClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiLabelClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const defaultStyle = __theme().config('ui.label.defaultStyle') ?? 'default';

  const styles = [
    'default'
  ];

  styles.forEach((style) => {
    let cls = `s-label`;
    if (style !== defaultStyle) {
      cls += `:${style}`;
    }

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.label
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" label
        * 
        * @example        html
        * <label class="${cls.replace(':','\:')}">
        *   Hello world
        *   <input type="text" class="s-input" />
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace(':','--')} {
          @sugar.ui.label(${style});
      } 
    `);
  });

  Object.keys(__theme().baseColors()).forEach((colorName) => {
    vars.push(`
      /**
       * @name        s-label:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any label
       * 
       * @example       html
       * <label class="s-label\:${colorName}">
       *   Hello world
       *   <input type="text" class="s-input" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-label--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
  });

  replaceWith(vars);
}
