import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name          classes
 * @namespace     node.mixin.ui.tabs
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the tabs classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.tabs.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.tabs.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.tabs.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.tabs.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
                default: (_a = __STheme.get('ui.tabs.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.tabs.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.tabs.defaultColor'),
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
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', defaultColor: 'main', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Tabs
        * @namespace          sugar.style.ui
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
        * @cssClass       s-tabs:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs:fill       Add a background to the tabs
        * @cssClass       s-tabs:vertical    Display the tabs horizontally
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style ${finalParams.defaultStyle === style
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            *   <ul class="s-tabs${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent">
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape}
            *   <ul class="s-tabs${shape === finalParams.defaultShape ? '' : `:${shape}`} s-color:accent">
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * `;
    })
        .join('\n')}
        * 
        * @example        html       Grow
        *   <ul class="s-tabs:grow">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Fill
        *   <ul class="s-tabs:fill">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${__faker.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example      html        Vertical
        *   <ul class="s-tabs:vertical s-color:complementary">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        Scales
        *   <ul class="s-tabs:grow s-scale:13 s-color:accent">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `
            /**
              * @name           s-tabs
              * @namespace          sugar.style.ui.tabs
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
           `).code(`
          .s-tabs {
            @sugar.ui.tabs($scope: bare);
          }
          `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
              * @name           s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}
              * @namespace          sugar.style.ui.tabs
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
           `).code(`
          .s-tabs${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.ui.tabs($style: ${style}, $scope: lnf);
          }
        `, { type: 'CssClass' });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
            * @name           s-tabs${finalParams.defaultShape === shape ? '' : `:${shape}`}
            * @namespace          sugar.style.ui.tabs
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
         `).code(`
        .s-tabs${finalParams.defaultShape === shape ? '' : `--${shape}`} {
          @sugar.ui.tabs($shape: ${shape}, $scope: shape);

          &.s-tabs--vertical {
                @sugar.ui.tabs($direction: vertical, $shape: ${shape}, $scope: 'shape');
            }
        }
      `, { type: 'CssClass' });
        });
    }
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-tabs:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
    vars.comment(() => `/**
        * @name           s-tabs--grow
        * @namespace          sugar.style.ui.tabs
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
     `).code(`
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-tabs--fill
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>fill</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--fill">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs--fill {
      @sugar.ui.tabs($fill: true, $scope: fill);
    }
  `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-tabs--vertical
        * @namespace          sugar.style.ui.tabs
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
     `).code(`
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: 'direction');
    }
  `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDekM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLG1DQUFJLE9BQU87YUFDM0Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ2hEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxH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