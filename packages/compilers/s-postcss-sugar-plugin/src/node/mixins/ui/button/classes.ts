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

    vars.push(`
      /**
        * @name          Buttons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/buttons
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * 
        ${styles
            .map((style) => {
                return ` * @cssClass     s-btn${
                    style === 'default' ? '' : `\:${style}`
                }           Apply the ${style} button style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <a class="s-btn\:${style} s-mr\:20">Click me!</a>
            *   <a class="s-btn\:${style} s-mr\:20 s-ui\:accent">Click me!</a>
            *   <a class="s-btn\:${style} s-mr\:20 s-ui\:complementary">Click me!</a>
            *   <a class="s-btn\:${style} s-ui\:error">Click me!</a>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

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

    // Object.keys(__theme().baseColors()).forEach((colorName) => {
    //     vars.push(`
    //   /**
    //    * @name        s-btn--${colorName}
    //    * @namespace     sugar.css.ui.button
    //    * @type          CssClass
    //    *
    //    * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any button
    //    *
    //    * @example       html
    //    * <a class="<s-btn--${colorName}">I'm a cool ${colorName} button</a>
    //    *
    //    * @since       2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   .s-btn--${colorName} {
    //     @sugar.color.remap(ui, ${colorName});
    //   }
    // `);
    // });

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
