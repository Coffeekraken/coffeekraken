import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the button classes
 *
 * @param       {('solid'|'gradient'|'outline'|'text')[]}                           [styles=['solid','gradient','outline','text']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'|'gradient'|'outline'|'text'}                [defaultStyle='theme.ui.button.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.button.defaultShape']           The default shape you want
 * @param       {String}                       [defaultColor='theme.ui.button.defaultColor']           The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.button.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: ['solid', 'gradient', 'outline', 'text'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: __STheme.get('ui.button.defaultStyle') ?? 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.button.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.button.defaultColor'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'tf', 'vr'],
                default: ['bare', 'lnf', 'shape', 'tf', 'vr'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiButtonClassesParams {
    styles: ('solid' | 'gradient' | 'outline' | 'text')[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid' | 'gradient' | 'outline' | 'text';
    defaultShape: 'default' | 'square' | 'pill';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'bare' | 'shape' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiButtonClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/button.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
        styles: ['solid', 'gradient', 'outline', 'text'],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        defaultColor: 'main',
        scope: ['bare', 'lnf', 'shape', 'tf', 'vr'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Buttons
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/button
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-btn${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} button style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-btn${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} button shape`;
            })
            .join('\n')}
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped button(s)
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style ${
                    finalParams.defaultStyle === style
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
            *   <a tabindex="0" disabled class="s-btn:${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-mbe:20"><span>Click me!</span></a>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape} shape ${
                    finalParams.defaultShape === shape
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20">Click me!</a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20 s-color:accent">Click me!</a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20 s-color:complementary">Click me!</a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20 s-color:info">Click me!</a>
            *   <a tabindex="0" class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20 s-color:error">Click me!</a>
            *   <a tabindex="0" disabled class="s-btn:${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-mbe:20">Click me!</a>
            * `;
            })
            .join('\n')}
        * 
        * @example       html       Scales
        *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:16 s-mie:20">Click me!</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-btn
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" button
            * 
            * @example        html
            * <a class="s-btn">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
        .s-btn {
            @sugar.ui.button($scope: bare);
        }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            let cls = `s-btn`;
            if (style !== finalParams.defaultStyle) {
                cls += `--${style}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" button
            * 
            * @example        html
            * <a class="${cls
                .replace(/\./gm, ' ')
                .trim()}">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
        .${cls} {
            @sugar.ui.button($style: ${style}, $scope: lnf);
        }`,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-btn`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" button
            * 
            * @example        html
            * <a class="${cls
                .replace(/\./gm, ' ')
                .trim()}">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
        .${cls} {
            @sugar.ui.button($shape: ${shape}, $scope: shape);
        }`,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    vars.comment(
        () => `/**
        * @name           s-btn--block
        * @namespace          sugar.style.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
    ).code(
        `
      .s-btn--block {
        display: block !important;
        width: 100%;
      }
    `,
        {
            type: 'CssClass',
        },
    );

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-format:text button
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent a simple button tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <button>
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @sugar.format.text {
                button {
                    @sugar.ui.button($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-btn:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.button
            * @type           CssClass
            * 
            * This class represent some buttons in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @sugar.rhythm.vertical {
                button, .s-btn {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.button.rhythmVertical'),
                    )}
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
