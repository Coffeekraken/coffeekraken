import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: ['solid', 'gradient', 'outline', 'text'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: __theme().config('ui.button.defaultStyle') ?? 'solid',
        },
    };
}

export interface IPostcssSugarPluginUiButtonClassesParams {
    styles: ('solid' | 'gradient' | 'outline' | 'text')[];
    defaultStyle: 'solid' | 'gradient' | 'outline' | 'text';
}

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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-btn${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} button style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
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
        * <!-- scales -->
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Scales</h3>
        *   <a class="s-btn s-scale\:05 s-mr\:20 s-mb\:20">Click me!</a>
        *   <a class="s-btn s-scale\:1 s-mr\:20 s-mb\:20">Click me!</a>
        *   <a class="s-btn s-scale\:12 s-mr\:20 s-mb\:20">Click me!</a>
        *   <a class="s-btn s-scale\:15 s-mr\:20 s-mb\:20">Click me!</a>
        *   <a class="s-btn s-scale\:20 s-mb\:20">Click me!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        let cls = `s-btn`;
        if (style !== finalParams.defaultStyle) {
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
