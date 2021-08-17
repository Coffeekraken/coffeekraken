import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static definition = {
        sizes: {
            type: 'String[]',
            alias: 's',
        },
    };
}

export interface IPostcssSugarPluginUiButtonClassesParams {}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    const defaultStyle = __theme().config('ui.button.defaultStyle') ?? 'default';

    const styles = ['default', 'gradient', 'outline', 'text'];

    styles.forEach((style) => {
        let cls = `s-btn`;
        if (style !== defaultStyle) {
            cls += `--${style}`;
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
        vars.push([`.${cls} {`, ` @sugar.ui.button($style: ${style});`, `}`].join('\n'));
    });

    Object.keys(__theme().baseColors()).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-btn--${colorName}
       * @namespace     sugar.css.ui.button
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any button
       * 
       * @example       html
       * <a class="<s-btn--${colorName}">I'm a cool ${colorName} button</a>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-btn--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });

    vars.push(`/**
        * @name           s-btn--shrinked
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">shrinked</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--shrinked">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--shrinked {
        @sugar.ui.button($shrinked: true, $scope: shrinked);
      }
    `);

    vars.push(`/**
        * @name           s-btn--block
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--block {
        display: block !important;
      }
    `);

    replaceWith(vars);
}
