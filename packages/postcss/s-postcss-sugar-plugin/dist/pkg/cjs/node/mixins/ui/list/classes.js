"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.list
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 *Generate the list classes
 *
 * @param       {('dl'|'ul'|'ol'|'icon')[]}                           [styles=['dl','ul','ol','icon']]         The style(s) you want to generate
 * @param       {'dl'|'ul'|'ol'|'icon'}                [defaultStyle='theme.ui.list.defaultStyle']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.list.classes;
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
                values: ['dl', 'ul', 'ol', 'icon'],
                default: ['dl', 'ul', 'ol', 'icon'],
            },
            defaultStyle: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: (_a = s_theme_1.default.get('ui.list.defaultStyle')) !== null && _a !== void 0 ? _a : 'dl',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'tf', 'vr'],
                default: ['bare', 'lnf', 'tf', 'vr'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiListClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'dl', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Lists
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/lists
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply list styles to any ul, ol, dl, etc...
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
        return ` * @cssClass     s-list${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} list style`;
    })
        .join('\n')}
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style ${params.defaultStyle === style
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            *   <ul class="s-list:${style} ${style === 'ol' ? 's-color:accent s-scale:15' : ''}">
            *     <li>${style === 'icon' ? `<i class="s-icon:user"></i>` : ''}${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
            *     <li>${style === 'icon'
            ? `<i class="s-icon:heart s-color:accent"></i>`
            : ''}${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
            *     <li>${style === 'icon'
            ? `<i class="s-icon:fire s-color:error"></i>`
            : ''}${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
            *   </ul>
            * `;
    })
        .join('\n')}
        *
        * @example        html          RTL Support
        * <div dir="rtl">
        *   <ul class="s-list:ul s-color:accent s-mbe:30">
        *     <li>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *     <li>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list:ol s-color:accent s-mbe:30">
        *     <li>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *     <li>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list:icon s-color:accent s-mbe:30">
        *     <li><i class="s-icon:user"></i> ${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *     <li><i class="s-icon:heart s-color:error"></i> ${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example          html         Colors (none-exhaustive)
        *   <ul class="s-list:ol s-color:accent">
        *     <li>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *     <li class="s-color:complementary">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *     <li class="s-color:error">${faker_1.default.name.title()} ${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-list
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent an "<yellow>bare</yellow>" list
            * 
            * @feature       Support vertical rhythm
            * 
            * @example        html
            * <ul class="s-list">
            *   <li>Hello</li>
            *   <li>World</li>
            * </ul>
            * 
            * @since       2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-list {
            @sugar.ui.list($scope: bare);
        }
    `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
                * @name           s-list${finalParams.defaultStyle === style ? '' : `:${style}`}
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" list
                * 
                * @feature       Support vertical rhythm
                * 
                * @example        html
                * <ul class="s-list${finalParams.defaultStyle === style ? '' : `:${style}`}">
                *   <li>Hello</li>
                *   <li>World</li>
                * </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-list${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.list($scope: lnf);
            }
        `, {
                type: 'CssClass',
            });
        });
    }
    // ul
    vars.comment(() => `/**
        * @name           s-list--ul
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list:ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
      .s-list--ul {
        @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
      }
  `, {
        type: 'CssClass',
    });
    // ul:icon
    vars.comment(() => `/**
        * @name           s-list--icon
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list:icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`);
    vars.code(() => `
      .s-list--icon {
          @sugar.ui.list($style: icon, $scope: '${finalParams.scope.join(',')}');
      }`, {
        type: 'CssClass',
    });
    // ol
    vars.comment(() => `/**
        * @name           s-list--ol
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--ol">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
      .s-list--ol {
        @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
      }   
  `, {
        type: 'CssClass',
    });
    // dl
    vars.comment(() => `/**
        * @name           s-list--dl
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>dl</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--dl">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
      .s-list--dl {
        @sugar.ui.list($style: dl, $scope: '${finalParams.scope.join(',')}');
      }   
  `, {
        type: 'CssClass',
    });
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text ul
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent a simple ul tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <ul>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ul>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                ul {
                    @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
        vars.comment(() => `/**
            * @name           s-format:text ol
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent a simple ol tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <ol>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ol>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                ol {
                    @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent some lists in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <ul class="s-list:ul">
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ul>
            *   <ol class="s-list:ol">
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ol>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                ul, .s-list--ul,
                ol, .s-list--ol {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.list.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sd0NBQXlDLFNBQVEscUJBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztnQkFDbEMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3RDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztnQkFDbEMsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsbUNBQUksSUFBSTthQUN4RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFvRCw2REFBUztBQUU5RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFB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