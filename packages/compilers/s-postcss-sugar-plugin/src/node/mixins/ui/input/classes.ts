import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            default: __theme().config('ui.input.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiFormClassesParams {
    styles: string[];
    defaultStyle: 'solid';
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
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

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
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-input${
                    finalParams.defaultStyle === style ? '' : `\:${style}`
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
            *   <label class="s-label s-mb\:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50" />
            *   </label>
            *   <label class="s-label s-mb\:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-ui\:accent" />
            *   </label>
            *   <label class="s-label s-mb\:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-ui\:complementary" />
            *   </label>
            *   <label class="s-label s-mb\:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-ui\:error" />
            *   </label>
            *   <label dir="rtl" class="s-label s-mb\:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${style} s-width\:50 s-ui\:accent" />
            *   </label>
            *   <label class="s-label s-mb\:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width\:50 s-scale\:15 s-ui\:accent" />
            *   </label>
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
        const isDefaultStyle = finalParams.defaultStyle === style;

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
