import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
                default: (_a = __STheme.config('ui.badge.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.badge.defaultShape'),
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
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Badges
        * @namespace          sugar.css.ui
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
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:40 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:20">${style} style</h3>
            *   <a class="s-badge:${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultStyle === style ? '' : `:${style}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultStyle === style ? '' : `:${style}`} s-color:error">Say hello!</a>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-font:40 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:20">${shape} shape</h3>
            *   <a class="s-badge:${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultShape === shape ? '' : `:${shape}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge:${finalParams.defaultShape === shape ? '' : `:${shape}`} s-color:error">Say hello!</a>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:20">Scales</h3>
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.push(`/**
            * @name           s-badge
            * @namespace      sugar.css.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge">I'm a cool badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
        vars.push(`
            .s-badge {
                @sugar.ui.badge($scope: bare);
            }
        `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.push(`/**
            * @name           s-badge${finalParams.defaultStyle === style ? '' : `:${style}`}
            * @namespace      sugar.css.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">outline</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge${finalParams.defaultStyle === style ? '' : `:${style}`}">I'm a cool ${style} badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
            vars.push(`
            .s-badge${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.badge($style: ${style}, $scope: lnf);
            }
        `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.push(`/**
        * @name           s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`}
        * @namespace      sugar.css.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge${finalParams.defaultShape === shape ? '' : `:${shape}`}">I'm a cool ${shape} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
            vars.push(`
        .s-badge${shape === finalParams.defaultShape ? '' : `--${shape}`} {
            @sugar.ui.badge($shape: ${shape}, $scope: shape);
        }
    `);
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXOztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2FBQ2hDO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDekM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLE1BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxtQ0FBSSxPQUFPO2FBQy9EO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFB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