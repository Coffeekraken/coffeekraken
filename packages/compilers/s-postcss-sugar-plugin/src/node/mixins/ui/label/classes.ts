import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['inline', 'block', 'float'],
                default: ['inline', 'block', 'float'],
            },
            defaultStyle: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: __STheme.config('ui.label.defaultStyle'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiLabelClassesParams {
    styles: ('inline' | 'float')[];
    // shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'inline' | 'float';
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
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
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLabelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLabelClassesParams = {
        styles: [],
        // shapes: [],
        defaultStyle: 'inline',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
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
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <textarea class="s-input s-width:40" placeholder="Type something!" rows="3"></textarea>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-scale:15 s-label${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }">
        *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()} (Scaled)</span>
        *   </label>
        *   <label class="s-mbe:30 s-label${
        style === finalParams.defaultStyle ? '' : `:${style}`
    }">
    *     <input type="text" disabled class="s-input s-width:40" placeholder="Type something!" />
    *     <span>${__faker.name.title()} ${__faker.name.findName()} (Disabled)</span>
    *   </label>
    *   <label dir="rtl" class="s-mbe:30 s-label${
        style === finalParams.defaultStyle ? '' : `:${style}`
    }">
    *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
    *     <span>${__faker.name.title()} ${__faker.name.findName()} (RTL)</span>
    *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    finalParams.styles.forEach((style) => {
        let cls = `s-label`;
        if (style !== finalParams.defaultStyle) {
            cls += `:${style}`;
        }

        vars.comment(
            () => `/**
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
        `,
        );

        if (finalParams.scope.includes('bare')) {
            vars.code(`.s-label${
                finalParams.defaultStyle === style ? '' : `--${style}`
            } {
                @sugar.ui.label($style: ${style}, $scope: bare);
            } 
            `);
        }

        if (finalParams.scope.includes('lnf')) {
            vars.code(
                () => `
                .${cls.replace(':', '--')} {
                    @sugar.ui.label($style: ${style}, $scope: lnf);
                } 
            `,
            );
        }
    });

    vars.comment(
            () => `/**
        * @name           s-label:responsive
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   Hello world
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
        ).code(`
        .s-label--responsive {
            @sugar.media(mobile) {
                @sugar.ui.label($style: block, $scope: bare);
            }
        }
        `);

    return vars;
}
