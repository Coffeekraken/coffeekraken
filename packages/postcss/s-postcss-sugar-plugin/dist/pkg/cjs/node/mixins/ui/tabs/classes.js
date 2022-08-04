"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
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
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.tabs.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiListClassesInterface extends s_interface_1.default {
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
                default: (_a = s_theme_1.default.get('ui.tabs.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: s_theme_1.default.get('ui.tabs.defaultShape'),
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
exports.interface = postcssSugarPluginUiListClassesInterface;
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function dependencies() {
    return {
        files: [`${(0, dirname_1.default)()}/tabs.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
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
            *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
            *     <li tabindex="0">${faker_1.default.name.findName()}</li>
            *     <li tabindex="0">${faker_1.default.name.findName()}</li>
            *   </ul>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape}
            *   <ul class="s-tabs${shape === finalParams.defaultShape ? '' : `:${shape}`} s-color:accent">
            *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
            *     <li tabindex="0">${faker_1.default.name.findName()}</li>
            *     <li tabindex="0">${faker_1.default.name.findName()}</li>
            *   </ul>
            * `;
    })
        .join('\n')}
        * 
        * @example        html       Grow
        *   <ul class="s-tabs:grow">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Fill
        *   <ul class="s-tabs:fill">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example      html        Vertical
        *   <ul class="s-tabs:vertical s-color:complementary">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        Scales
        *   <ul class="s-tabs:grow s-scale:13 s-color:accent">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFBLGlCQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLG1DQUFJLE9BQU87YUFDM0Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxL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