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
        var _a;
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
                default: (_a = __STheme.get('ui.badge.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.badge.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.badgr.defaultColor'),
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
export { postcssSugarPluginUiBadgeClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/badge.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
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
        return ` * @cssClass     s-badge${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} badge style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-badge${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} badge shape`;
    })
        .join('\n')}
        * 
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style}
            *   <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`} s-color:error">Say hello!</a>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape}
            *   <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`} s-color:error">Say hello!</a>
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
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
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
        */`).code(`
            .s-badge {
                @sugar.ui.badge($scope: bare);
            }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
            * @name           s-badge${finalParams.defaultStyle === style ? '' : `:${style}`}
            * @namespace          sugar.style.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">outline</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`}">I'm a cool ${style} badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-badge${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.badge($style: ${style}, $scope: lnf);
            }
        `, { type: 'CssClass' });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
        * @name           s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`}
        * @namespace          sugar.style.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`}">I'm a cool ${shape} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`).code(`
        .s-badge${shape === finalParams.defaultShape ? '' : `--${shape}`} {
            @sugar.ui.badge($shape: ${shape}, $scope: shape);
        }
    `, { type: 'CssClass' });
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUNoQztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQ3pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsbUNBQUksT0FBTzthQUM1RDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdB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