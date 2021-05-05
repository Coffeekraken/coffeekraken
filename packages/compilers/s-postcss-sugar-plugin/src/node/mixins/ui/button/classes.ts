import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
  static definition = {
    colors: {
      type: 'String[]',
      alias: 'c'
    },
    sizes: {
      type: 'String[]',
      alias: 's'
    }
  };
}

export interface IPostcssSugarPluginUiButtonClassesParams {
  colors: string[];
  sizes: string[];
}

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
  const colors = __theme().config('color'),
    sizes = __theme().config('size');

  const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
    colors: Object.keys(colors),
    sizes: Object.keys(sizes),
    ...params
  };

  const vars: string[] = [
    `
    @sugar.scope(bare) {
      .s-btn {
        @sugar.ui.button()
      }
    }
  `
  ];

  const styles = __theme().config('ui.button.styles');

  vars.push('@sugar.scope(lnf) {');

  styles.forEach((style) => {
    finalParams.colors.forEach((colorName) => {
      const styleCls = style === 'default' ? '' : `.s-btn--${style}`;
      const cls =
        colorName === 'default'
          ? `.s-btn${styleCls}`
          : `.s-btn.s-btn--${colorName}${styleCls}`;

      vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" button with the "<yellow>${colorName}</yellow>" color applied
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
      */`);
      vars.push(
        [
          `${
            colorName === 'default'
              ? `.s-btn${styleCls}`
              : `.s-btn.s-btn--${colorName}${styleCls}`
          } {`,
          ` @sugar.ui.button($color: ${colorName}, $style: ${style});`,
          `}`
        ].join('\n')
      );
    });
  });

  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
