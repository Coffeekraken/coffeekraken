import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the badge classes
 *
 * @param       {('solid'|'outline')[]}                           [styles=['solid','outline']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'|'outline'}                [defaultStyle='theme.ui.badge.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.badge.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.badge.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.badge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid', 'outline'],
                default: ['solid', 'outline'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid', 'outline'],
                default: __STheme.get('ui.badge.defaultStyle') ?? 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.badge.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.badge.defaultColor'),
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

export interface IPostcssSugarPluginUiBadgeClassesParams {
    styles: ('solid' | 'outline')[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid' | 'outline';
    defaultShape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiBadgeClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/badge.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeClassesParams = {
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Badges
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a badge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-badge${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} badge style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-badge${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} badge shape`;
            })
            .join('\n')}
        * 
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style}
            *   <a class="s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:error">Say hello!</a>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape}
            *   <a class="s-badge${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:error">Say hello!</a>
            * `;
            })
            .join('\n')}
        * 
        * @example        html       Scales
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-badge
            * @namespace          sugar.style.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge">I'm a cool badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-badge {
                @sugar.ui.badge($scope: bare);
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(
                () => `/**
            * @name           s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            }
            * @namespace          sugar.style.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">outline</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge${
                finalParams.defaultStyle === style ? '' : `:${style}`
            }">I'm a cool ${style} badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
            ).code(
                `
            .s-badge${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.badge($style: ${style}, $scope: lnf);
            }
        `,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(
                () => `/**
        * @name           s-badge${
            finalParams.defaultShape === shape ? '' : `:${shape}`
        }
        * @namespace          sugar.style.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge${
            finalParams.defaultShape === shape ? '' : `:${shape}`
        }">I'm a cool ${shape} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
            ).code(
                `
        .s-badge${shape === finalParams.defaultShape ? '' : `--${shape}`} {
            @sugar.ui.badge($shape: ${shape}, $scope: shape);
        }
    `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
