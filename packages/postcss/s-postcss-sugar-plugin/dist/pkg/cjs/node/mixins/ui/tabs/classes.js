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
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.tabs.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
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
            lnfs: {
                type: 'String[]',
                values: ['default'],
                default: ['default'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default'],
                default: (_a = s_theme_1.default.get('ui.tabs.defaultLnf')) !== null && _a !== void 0 ? _a : 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiListClassesInterface;
const fs_1 = require("@coffeekraken/sugar/fs");
function dependencies() {
    return {
        files: [`${(0, fs_1.__dirname)()}/tabs.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'default', scope: [] }, params);
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
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-tabs${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} tabs lnf`;
    })
        .join('\n')}
        * @cssClass       s-tabs:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs:fill       Add a background to the tabs
        * @cssClass       s-tabs:vertical    Display the tabs horizontally
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf ${finalParams.defaultLnf === lnf
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            *   <ul class="s-tabs${lnf === finalParams.defaultLnf ? '' : `:${lnf}`} s-color:accent">
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
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(() => `/**
              * @name           s-tabs${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}
              * @namespace          sugar.style.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>${lnf}</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `).code(`
          .s-tabs${finalParams.defaultLnf === lnf ? '' : `--${lnf}`}:not(.s-bare) {
            @sugar.ui.tabs($lnf: ${lnf}, $scope: lnf);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sd0NBQXlDLFNBQVEscUJBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsbUNBQUksU0FBUzthQUMzRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFvRCw2REFBUztBQUU5RCwrQ0FBbUQ7QUFDbkQsU0FBZ0IsWUFBWTtJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFBLGNBQVMsR0FBRSxVQUFVLENBQUM7S0FDcEMsQ0FBQztBQUNOLENBQUM7QUFKRCxvQ0FJQztBQUVELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxF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