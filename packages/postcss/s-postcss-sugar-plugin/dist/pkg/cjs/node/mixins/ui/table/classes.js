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
 * @namespace     node.mixin.ui.table
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the table classes
 *
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.table.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.table.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiTableClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['default'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default'],
                default: s_theme_1.default.get('ui.table.defaultLnf'),
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
exports.interface = postcssSugarPluginUiTableClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Table
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/table
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice tables with ease.
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-table${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} table lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf ${finalParams.defaultLnf === lnf
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
            *   <table class="s-table${lnf === finalParams.defaultLnf ? '' : `:${lnf}`} s-mbe:30">
            *       <tr>
            *           <th>${faker_1.default.name.findName()}</th>
            *           <th>${faker_1.default.name.findName()}</th>
            *           <th>${faker_1.default.name.findName()}</th>
            *       </tr>
            *       <tr>
            *           <td>${faker_1.default.name.findName()}</td>
            *           <td>${faker_1.default.name.findName()}</td>
            *           <td>${faker_1.default.name.findName()}</td>
            *       </tr>
            *       <tr>
            *           <td>${faker_1.default.name.findName()}</td>
            *           <td>${faker_1.default.name.findName()}</td>
            *           <td>${faker_1.default.name.findName()}</td>
            *       </tr>
            *   </table>
            * `;
    })
        .join('\n')}
        *
        * @example      html        RTL Support
        * <div dir="rtl">
        *   <table class="s-table">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        * </div>
        * 
        * @example      html        Scales
        ${['07', '1', '13', '16']
        .map((scale) => `
        *   <table class="s-table s-scale:${scale}">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `)
        .join('\n')}
        * 
        * @example      html        Colors (non-exhaustive)
        ${['main', 'accent', 'complementary', 'error']
        .map((color) => `
        *   <table class="s-table s-color:${color}">
        *       <tr>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *           <th>${faker_1.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *           <td>${faker_1.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-table
            * @namespace          sugar.style.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" table
            * 
            * @example        html
            * <table class="s-table">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
        vars.code(() => `
                .s-table {
                    @sugar.ui.table($scope: bare);
                }`, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            const isDefaultStyle = finalParams.defaultLnf === lnf;
            const styleCls = isDefaultStyle ? '' : `.s-table--${lnf}`;
            const cls = `.s-table${styleCls}`;
            vars.comment(() => `/**
            * @name           s-table${isDefaultStyle ? '' : `:${lnf}`}
            * @namespace          sugar.style.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${lnf}</yellow>" table
            * 
            * @example        html
            * <table class="s-table${isDefaultStyle ? '' : `:${lnf}`}">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
            vars.code(() => `
                ${cls} {
                    @sugar.ui.table($lnf: ${lnf}, $scope: lnf);
                }`, { type: 'CssClass' });
        });
    }
    vars.comment(() => `/**
        * @name           s-format:text
        * @namespace          sugar.style.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.format.text {
          table {
              @sugar.ui.table;
          }
        } 
    `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-rhythm:vertical
        * @namespace          sugar.style.ui.table
        * @type           CssClass
        * 
        * This class represent some tables in the s-rhythm:vertical scope
        * 
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <div class="s-rhythm:vertical">
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.rhythm.vertical {
          table, .s-table {
              ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.table.rhythmVertical'))}
          }
        } 
    `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQy9DO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDdkM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUXFELDhEQUFTO0FBRS9ELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixVQUFVLEVBQUUsU0FBUyxFQUNyQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJ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