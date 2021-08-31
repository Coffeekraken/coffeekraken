import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['default', 'underline'],
        },
    };
}

export interface IPostcssSugarPluginUiFormClassesParams {
    styles: string[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormClassesParams = {
        styles: ['default', 'underline'],
        ...params,
    };

    const defaultStyle = __theme().config('ui.input.defaultStyle');

    const vars: string[] = [
        `
      .s-input {
        @sugar.ui.input.text()
      }
  `,
    ];

    vars.push(`
      /**
        * @name          Text Input
        * @namespace          sugar.css.ui.input
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-input${
                    defaultStyle === style ? '' : `\:${style}`
                }           Apply the ${style} input style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:accent s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:complementary s-mb\:30" />
            *   <input type="text" placeholder="Type something!" class="s-input\:${style} s-mr\:20 s-ui\:error s-mb\:30" />
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        const isDefaultStyle = defaultStyle === style;

        const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
        const cls = `.s-input${styleCls}`;

        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" input
        * 
        * @example        html
        * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
      */`);
        vars.push([`${cls} {`, ` @sugar.ui.input.text($style: ${style});`, `}`].join('\n'));
    });

    replaceWith(vars);
}
