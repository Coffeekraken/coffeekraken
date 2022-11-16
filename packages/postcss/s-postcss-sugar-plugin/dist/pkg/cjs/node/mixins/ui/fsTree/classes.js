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
 * @namespace     node.mixin.ui.fsTree
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the fsTree classes
 *
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.fsTree.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.fsTree.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFsTreeClassesInterface extends s_interface_1.default {
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
                default: (_a = s_theme_1.default.get('ui.fsTree.defaultLnf')) !== null && _a !== void 0 ? _a : 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiFsTreeClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'default', scope: [] }, params);
    const vars = new CssVars();
    function _example(classes, isDefault = false) {
        return `*   <ul class="s-fs-tree${isDefault ? '' : `:${classes}`}">
            *       <li class="active">
            *           <div>
            *               <i class="s-icon:folder-open"></i>
            *               <span tabindex="0">${faker_1.default.name.findName()}</span>
            *           </div>
            *           <ul>
            *               <li>
            *                   <div>
            *                       <i class="s-icon:file"></i>
            *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
            *                   </div>
            *               </li>
            *               <li class="active">
            *                   <div>
            *                       <i class="s-icon:folder-open"></i>
            *                       <span tabindex="0">${faker_1.default.name.findName()}</span>
            *                   </div>
                                <ul>
                    *               <li>
                    *                   <div>
                    *                       <i class="s-icon:file-pdf"></i>
                    *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *               <li>
                    *                  <div>
                    *                       <i class="s-icon:file-code"></i>
                    *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
                    *                  </div>
                    *               </li>
                    *              <li>
                    *                   <div>
                    *                       <i class="s-icon:file-image"></i>
                    *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *           </ul>
            *               </li>
            *              <li>
            *                   <div>
            *                       <i class="s-icon:file-archive"></i>
            *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
            *                   </div>
            *               </li>
            *           </ul>
            *           <li class="s-disabled">
            *               <div>
        *                       <i class="s-icon:file"></i>
        *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
        *                  </div>
        *               </li>
            *           <li>
            *               <div>
        *                       <i class="s-icon:file-code"></i>
        *                       <a tabindex="0">${faker_1.default.name.findName()}</a>
        *                 </div>
        *               </li>
            *       </li>
            *   </ul>
            *`;
    }
    vars.comment(() => `
      /**
        * @name          Fs Tree
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/fs-tree
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display a nice filesystem tree
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
        return ` * @cssClass     s-fs-tree${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} filesystem tree lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf} lnf ${finalParams.defaultLnf === lnf
            ? '<span class="s-badge:outline s-scale:05">default</span>'
            : ''}
                    ${_example(lnf, params.defaultLnf === lnf)}`;
    })
        .join('\n')}
        *
        * @example        html       RTL
        * <div dir="rtl">
        ${_example('')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-fs-tree
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent an "<yellow>${s_theme_1.default.get('ui.fsTree.defaultLnf')}</yellow>" filesystem tree
            * 
            * @feature       Support RTL
            * 
            * @example        html
            * <ul class="s-fs-tree">
            *       <li>
            *          <i class="s-icon:folder"></i> ${faker_1.default.name.findName()}
            *          <ul>
            *               <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
            *               <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
            *              <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
            *           </ul>
            *           <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
            *           <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
            *       </li>
            *   </ul>
            * 
            * @since       2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-fs-tree {
            @sugar.ui.fsTree($scope: bare);
        }
    `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(() => `/**
                * @name           s-fs-tree${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${lnf}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}">
                *       <li>
                *          <i class="s-icon:folder"></i> ${faker_1.default.name.findName()}
                *          <ul>
                *               <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
                *               <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
                *              <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
                *           </ul>
                *           <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
                *           <li><i class="s-icon:file"></i> ${faker_1.default.name.findName()}</li>
                *       </li>
                *   </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-fs-tree${lnf === finalParams.defaultLnf ? '' : `--${lnf}`} {
                @sugar.ui.fsTree($lnf: ${lnf}, $scope: lnf);
            }
        `, {
                type: 'CssClass',
            });
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sMENBQTJDLFNBQVEscUJBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsbUNBQUksU0FBUzthQUM3RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUXNELCtEQUFTO0FBRWhFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixVQUFVLEVBQUUsU0FBUyxFQUNyQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJ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