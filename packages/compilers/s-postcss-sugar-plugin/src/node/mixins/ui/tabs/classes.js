import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static get _definition() {
        var _a;
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: (_a = __STheme.config('ui.tabs.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.tabs.defaultShape'),
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
export { postcssSugarPluginUiListClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/tabs.js`],
    };
}
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Tabs
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @support          rtl
        * @support          chromium            
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-tabs${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} tabs style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-tabs${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} tabs shape`;
    })
        .join('\n')}
        * @cssClass       s-tabs\:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs\:vertical    Display the tabs horizontally
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <ul class="s-tabs${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent">
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- Shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${shape} shape</h3>
            *   <ul class="s-tabs${shape === finalParams.defaultShape ? '' : `:${shape}`} s-color:accent">
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * <!-- grow -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Grow</h3>
        *   <ul class="s-tabs\:grow">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- rtl -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">RTL</h3>
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${__faker.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- vertical -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Vertical</h3>
        *   <ul class="s-tabs\:vertical s-color:complementary">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- scaled -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Scaled</h3>
        *   <ul class="s-tabs\:grow s-scale\:13 s-color:accebt">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.push(`
            /**
              * @name           s-tabs
              * @namespace      sugar.css.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>bare</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
          .s-tabs {
            @sugar.ui.tabs($scope: bare);
          }
          `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.push(`/**
              * @name           s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}
              * @namespace      sugar.css.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>${style}</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
          .s-tabs${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.ui.tabs($style: ${style}, $scope: lnf);
          }
        `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.push(`/**
            * @name           s-tabs${finalParams.defaultShape === shape ? '' : `:${shape}`}
            * @namespace      sugar.css.ui.tabs
            * @type           CssClass
            * 
            * This class represent a "<yellow>${shape}</yellow>" tabs
            * 
            * @example        html
            * <div class="s-tabs${finalParams.defaultShape === shape ? '' : `:${shape}`}">
            *    <div class="active">An active tab</div>
            *    <div>A tab</div>
            * </div>
          */
        .s-tabs${finalParams.defaultShape === shape ? '' : `--${shape}`} {
          @sugar.ui.tabs($shape: ${shape}, $scope: shape);
        }
      `);
        });
    }
    vars.push(`/**
        * @name           s-tabs--grow
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `);
    vars.push(`/**
        * @name           s-tabs--vertical
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: direction);
    }
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsbUNBQUksT0FBTzthQUM5RDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7YUFDbkQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVB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