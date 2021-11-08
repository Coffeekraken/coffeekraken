import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['inline', 'float'],
                default: ['inline', 'float'],
            },
            defaultStyle: {
                type: 'String',
                values: ['inline', 'float'],
                default: __STheme.config('ui.label.defaultStyle'),
            },
        };
    }
}

export interface IPostcssSugarPluginUiLabelClassesParams {
    styles: ('inline' | 'float')[];
    defaultStyle: 'inline';
}

export { postcssSugarPluginUiLabelClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/label.js`],
    };
}

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
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} label style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <label class="s-mbe:30 s-color:accent s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-color:info s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-color:error s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-color:accent s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <textarea class="s-input s-width:40" placeholder="Type something!" rows="3"></textarea>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label dir="rtl" class="s-mbe:30 s-color:accent s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()} (RTL)</span>
            *   </label>
            *   <label class="s-mbe:30 s-scale\:15 s-color:accent s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()} (Scaled)</span>
            *   </label>
            *   <label class="s-mbe:30 s-color:accent s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" disabled class="s-input s-width:40" placeholder="Type something!" />
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

    return vars;
}
