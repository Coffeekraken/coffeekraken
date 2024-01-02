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
 * @as          @s.ui.fsTree.classes
 * @namespace     node.mixin.ui.fsTree
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the fsTree classes
 *
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.fsTree.classes
 *
 * @example     css
 * @s.ui.fsTree.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFsTreeClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiFsTreeClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
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
        * @namespace          sugar.style.ui.fsTree
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/fs-tree
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display a nice filesystem tree
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.fsTree.classes;
        * 
        * .my-fsTree {
        *   @s.ui.fsTree;
        * }
        * 
        * @cssClass     s-fs-tree       Apply the filesystem tree lnf
        * 
        * @example        html       Default
        ${_example('')}
        *
        * @example        html       Shapes
        * <div class="s-shape:pill">
        ${_example('')}
        * </div>
        * <div class="s-shape:square">
        ${_example('')}
        * </div>
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
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
            * @name           s-fs-tree
            * @namespace          sugar.style.ui.fsTree
            * @type           CssClass
            * 
            * This class represent an "<yellow>${s_theme_1.default.current.get('ui.fsTree.defaultLnf')}</yellow>" filesystem tree
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
            @s.scope.only 'bare' {
                @s.ui.fsTree;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(() => `/**
                * @name           s-fs-tree
                * @namespace          sugar.style.ui.fsTree
                * @type           CssClass
                * 
                * This class represent an filesystem tree
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
                @s.scope.only 'lnf' {
                    @s.ui.fsTree;
                }
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO1FBQ3hDLE9BQU8sMkJBQTJCLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRTs7OztpREFJdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztzREFNbEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozt5REFNcEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs4REFNbEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs4REFNdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs4REFNdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7O3NEQVEvQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztrREFPM0IsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztrREFNdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7O2NBSzNELENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBOEJKLFFBQVEsQ0FBQyxFQUFFLENBQUM7Ozs7VUFJWixRQUFRLENBQUMsRUFBRSxDQUFDOzs7VUFHWixRQUFRLENBQUMsRUFBRSxDQUFDOzs7OztVQUtaLFFBQVEsQ0FBQyxFQUFFLENBQUM7Ozs7OztLQU1qQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7aURBS21DLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDckQsc0JBQXNCLENBQ3pCOzs7Ozs7O3VEQU8wQyxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OERBRWhCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzhEQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs2REFDeEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzBEQUUxQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswREFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7UUFPekUsQ0FDSCxDQUFDLElBQUksQ0FDRjs7Ozs7O0tBTUgsRUFDRztRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7OzsyREFVNkMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O2tFQUVoQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtrRUFDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUVBQ3hCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs4REFFMUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OERBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O1lBT3pFLENBQ1AsQ0FBQyxJQUFJLENBQ0Y7Ozs7OztTQU1DLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTVORCw0QkE0TkMifQ==