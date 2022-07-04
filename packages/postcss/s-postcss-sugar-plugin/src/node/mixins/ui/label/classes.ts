import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the label classes
 *
 * @param       {('inline'|'block'|'float')[]}                           [styles=['inline','block','float']]         The style(s) you want to generate
 * @param       {'inline'|'block'|'float'}                [defaultStyle='theme.ui.label.defaultStyle']           The default style you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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
                default: __STheme.get('ui.label.defaultStyle'),
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
        * @namespace          sugar.style.ui
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
            *     <input type="text" class="s-input ${
                style !== 'block' ? 's-width:40' : ''
            }" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *     <textarea class="s-input ${
                style !== 'block' ? 's-width:40' : ''
            }" placeholder="Type something!" rows="3"></textarea>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
        *   <label class="s-mbe:30 s-label${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }">
        *     <input type="text" disabled class="s-input ${
            style !== 'block' ? 's-width:40' : ''
        }" placeholder="Type something!" />
        *     <span>I'm disabled</span>
    *   </label>
    *   <label dir="rtl" class="s-mbe:30 s-label${
        style === finalParams.defaultStyle ? '' : `:${style}`
    }">
    *     <input type="text" class="s-input ${
        style !== 'block' ? 's-width:40' : ''
    }" placeholder="Type something!" />
    *     <span>Support RTL</span>
    *   </label>
    *   <label class="s-mbe:30 s-label${
        style === finalParams.defaultStyle ? '' : `:${style}`
    } s-color:accent">
    *     <input type="text" class="s-input ${
        style !== 'block' ? 's-width:40' : ''
    }" placeholder="Type something!" />
    *     <span>With the accent color</span>
    *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                * @namespace          sugar.style.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${style}</s-color>" label
                * 
                * @example        html
                * <label class="${cls.replace(':', ':')}">
                *   <span>Hello world</span>
                *   <input type="text" class="s-input" placeholder="Type something!" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        );

        if (finalParams.scope.includes('bare')) {
            vars.code(
                `.s-label${
                    finalParams.defaultStyle === style ? '' : `--${style}`
                } {
                @sugar.ui.label($style: ${style}, $scope: bare);
            } 
            `,
                {
                    type: 'CssClass',
                },
            );
        }

        if (finalParams.scope.includes('lnf')) {
            vars.code(
                () => `
                .${cls.replace(':', '--')} {
                    @sugar.ui.label($style: ${style}, $scope: lnf);
                } 
            `,
                {
                    type: 'CssClass',
                },
            );
        }
    });

    vars.comment(
        () => `/**
        * @name           s-label:responsive
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   <span>Hello world</span>
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
        .s-label--responsive {

            > * {
                max-width: 66.6%;
            }

            @sugar.media(<=mobile) {
                @sugar.ui.label($style: block, $scope: bare);

                > * {
                    max-width: 100%;
                }    
            }
        }
        `,
        {
            type: 'CssClass',
        },
    );

    return vars;
}
