import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the input classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.input.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.input.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.input.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.input.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                default: __STheme.get('ui.input.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                default: __STheme.get('ui.input.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.input.defaultColor'),
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

export interface IPostcssSugarPluginUiFormClassesParams {
    styles: string[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/text.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormClassesParams = {
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        defaultColor: 'main',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Text Input
        * @namespace          sugar.style.ui.input
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
                    finalParams.defaultStyle === style ? '' : `:${style}`
                }           Apply the ${style} input style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-input${
                    finalParams.defaultShape === shape ? '' : `:${shape}`
                }           Apply the ${shape} input shape`;
            })
            .join('\n')}
        * 
        ${__keysFirst(finalParams.styles, ['default'])
            .map((style) => {
                return ` * @example        html       ${style} style
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${style} s-width:40" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *       <span>Support RTL</span>
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${style} s-width:40" />
            *   </label>
            * 
            * `;
            })
            .join('\n')}
        *
        ${__keysFirst(finalParams.shapes, ['default'])
            .map((shape) => {
                return ` * @example        html       ${shape} shape
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40" />
            *   </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        <span>I'm disabled</span>
            *       <input type="text" disabled placeholder="Type something!" class="s-input\:${shape} s-width:40" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html       Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
            .map((color) => {
                return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color} s-width:40" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example        html       Scales (non-exhaustive)
        ${['07', '10', '13', '16']
            .map((scale) => {
                return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       <span>${__faker.name.findName()}</span>
            *       <input type="text" placeholder="Type something!" class="s-input s-scale:${scale} s-width:40" />
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

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-input
        * @namespace          sugar.style.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
        .s-input {
            @sugar.ui.input($scope: bare);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            const isDefaultStyle = finalParams.defaultStyle === style;

            const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
            const cls = `.s-input${styleCls}`;

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
            ).code(
                [
                    `${cls} {`,
                    ` @sugar.ui.input($style: ${style}, $scope: lnf);`,
                    `}`,
                ].join('\n'),
                {
                    type: 'CssClass',
                },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            const isDefaultShape = finalParams.defaultShape === shape;

            const shapeCls = isDefaultShape ? '' : `.s-input--${shape}`;
            const cls = `.s-input${shapeCls}`;

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
            ).code(
                [
                    `${cls} {`,
                    ` @sugar.ui.input($shape: ${shape}, $scope: shape);`,
                    `}`,
                ].join('\n'),
                {
                    type: 'CssClass',
                },
            );
        });
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-input:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    return vars;
}
