import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['inline', 'float'],
            default: ['inline', 'float'],
        },
        defaultStyle: {
            type: 'String',
            values: ['inline', 'float'],
            default: __theme().config('ui.label.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiLabelClassesParams {
    styles: ('inline' | 'float')[];
    defaultStyle: 'inline';
}

export { postcssSugarPluginUiLabelClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLabelClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLabelClassesParams = {
        styles: ['inline', 'float'],
        defaultStyle: 'inline',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Labels
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-label${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} label style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <label class="s-mb\:30 s-ui\:accent s-label${style === finalParams.defaultStyle ? '' : `\:${style}`}">
            *     <input type="text" class="s-input s-width\:50" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:info s-label${style === finalParams.defaultStyle ? '' : `\:${style}`}">
            *     <input type="text" class="s-input s-width\:50" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:error s-label${style === finalParams.defaultStyle ? '' : `\:${style}`}">
            *     <input type="text" class="s-input s-width\:50" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label${style === finalParams.defaultStyle ? '' : `\:${style}`}">
            *     <textarea class="s-input s-width\:50" placeholder="Type something!" rows="3"></textarea>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label dir="rtl" class="s-mb\:30 s-ui\:accent s-label${
                style === finalParams.defaultStyle ? '' : `\:${style}`
            }">
            *     <input type="text" class="s-input s-width\:50" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()} (RTL)</span>
            *   </label>
            *   <label class="s-mb\:30 s-scale\:15 s-ui\:accent s-label${
                style === finalParams.defaultStyle ? '' : `\:${style}`
            }">
            *     <input type="text" class="s-input s-width\:50" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()} (Scaled)</span>
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
        let cls = `s-label`;
        if (style !== finalParams.defaultStyle) {
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
        * <label class="${cls.replace(':', ':')}">
        *   Hello world
        *   <input type="text" class="s-input" placeholder="Type something!" />
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace(':', '--')} {
          @sugar.ui.label(${style});
      } 
    `);
    });

    replaceWith(vars);
}
