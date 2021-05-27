import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
  static definition = {
    sizes: {
      type: 'String[]',
      alias: 's'
    }
  };
}

export interface IPostcssSugarPluginUiButtonClassesParams {}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const defaultStyle = __theme().config('ui.button.defaultStyle') ?? 'default';

  const styles = [
    'default',
    ...Object.keys(__theme().config('ui.button'))
      .filter((s) => s.match(/^:/))
      .map((s) => s.replace(':', ''))
  ];

  styles.forEach((style) => {
    if (style === 'default') return;

    let cls = `[class*="s-btn"]`;
    if (style !== defaultStyle) {
      cls += `[class*=":${style}"]`;
    }

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" button
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(
      [`${cls} {`, ` @sugar.ui.button($style: ${style});`, `}`].join('\n')
    );
  });

  Object.keys(__theme().config('color')).forEach((colorName) => {
    vars.push(`
      /**
       * @name        .s-btn:${colorName}
       * @namespace     sugar.css.ui.button
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any button
       * 
       * @example       html
       * <a class="<s-btn:${colorName}">I'm a cool ${colorName} button</a>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      [class*="s-btn"][class*=":${colorName}"] {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
