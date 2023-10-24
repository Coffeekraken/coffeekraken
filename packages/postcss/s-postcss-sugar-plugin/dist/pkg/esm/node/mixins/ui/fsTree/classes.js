import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.fsTree.classes
 *
 * @example     css
 * @s.ui.fsTree.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
    static get _definition() {
        return {
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
export { postcssSugarPluginUiFsTreeClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    function _example(classes, isDefault = false) {
        return `*   <ul class="s-fs-tree${isDefault ? '' : `:${classes}`}">
            *       <li class="active">
            *           <div>
            *               <i class="s-icon:folder-open"></i>
            *               <span tabindex="0">${__faker.name.findName()}</span>
            *           </div>
            *           <ul>
            *               <li>
            *                   <div>
            *                       <i class="s-icon:file"></i>
            *                       <a tabindex="0">${__faker.name.findName()}</a>
            *                   </div>
            *               </li>
            *               <li class="active">
            *                   <div>
            *                       <i class="s-icon:folder-open"></i>
            *                       <span tabindex="0">${__faker.name.findName()}</span>
            *                   </div>
                                <ul>
                    *               <li>
                    *                   <div>
                    *                       <i class="s-icon:file-pdf"></i>
                    *                       <a tabindex="0">${__faker.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *               <li>
                    *                  <div>
                    *                       <i class="s-icon:file-code"></i>
                    *                       <a tabindex="0">${__faker.name.findName()}</a>
                    *                  </div>
                    *               </li>
                    *              <li>
                    *                   <div>
                    *                       <i class="s-icon:file-image"></i>
                    *                       <a tabindex="0">${__faker.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *           </ul>
            *               </li>
            *              <li>
            *                   <div>
            *                       <i class="s-icon:file-archive"></i>
            *                       <a tabindex="0">${__faker.name.findName()}</a>
            *                   </div>
            *               </li>
            *           </ul>
            *           <li class="s-disabled">
            *               <div>
        *                       <i class="s-icon:file"></i>
        *                       <a tabindex="0">${__faker.name.findName()}</a>
        *                  </div>
        *               </li>
            *           <li>
            *               <div>
        *                       <i class="s-icon:file-code"></i>
        *                       <a tabindex="0">${__faker.name.findName()}</a>
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
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-fs-tree
            * @namespace          sugar.style.ui.fsTree
            * @type           CssClass
            * 
            * This class represent an "<yellow>${__STheme.get('ui.fsTree.defaultLnf')}</yellow>" filesystem tree
            * 
            * @feature       Support RTL
            * 
            * @example        html
            * <ul class="s-fs-tree">
            *       <li>
            *          <i class="s-icon:folder"></i> ${__faker.name.findName()}
            *          <ul>
            *               <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
            *               <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
            *              <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
            *           </ul>
            *           <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
            *           <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
            *       </li>
            *   </ul>
            * 
            * @since       2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-fs-tree {
            @s.ui.fsTree($scope: bare);
        }
    `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
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
                *          <i class="s-icon:folder"></i> ${__faker.name.findName()}
                *          <ul>
                *               <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
                *               <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
                *              <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
                *           </ul>
                *           <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
                *           <li><i class="s-icon:file"></i> ${__faker.name.findName()}</li>
                *       </li>
                *   </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-fs-tree:not(.s-bare) {
                @s.ui.fsTree($scope: lnf);
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7UUFDeEMsT0FBTywyQkFBMkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFOzs7O2lEQUl2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3NEQU1sQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3lEQU1wQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OzhEQU1sQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OzhEQU12QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OzhEQU12QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7c0RBUS9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O2tEQU8zQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O2tEQU12QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Y0FLM0QsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUE4QkosUUFBUSxDQUFDLEVBQUUsQ0FBQzs7OztVQUlaLFFBQVEsQ0FBQyxFQUFFLENBQUM7OztVQUdaLFFBQVEsQ0FBQyxFQUFFLENBQUM7Ozs7O1VBS1osUUFBUSxDQUFDLEVBQUUsQ0FBQzs7Ozs7O0tBTWpCLENBQ0EsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7aURBSytCLFFBQVEsQ0FBQyxHQUFHLENBQzdDLHNCQUFzQixDQUN6Qjs7Ozs7Ozt1REFPMEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzhEQUVoQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NkRBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzswREFFMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MERBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O1FBT3pFLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7Ozs7S0FJUCxFQUNPO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7MkRBVXlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOztrRUFFaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7a0VBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lFQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OERBRTFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzhEQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztZQU96RSxDQUNILENBQUMsSUFBSSxDQUNGOzs7O1NBSUgsRUFDRztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9