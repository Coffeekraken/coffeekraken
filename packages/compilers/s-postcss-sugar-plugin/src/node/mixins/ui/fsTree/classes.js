var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
}
postcssSugarPluginUiFsTreeClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultColor: {
        type: 'String',
        default: __theme().config('ui.fsTree.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __theme().config('ui.fsTree.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
export { postcssSugarPluginUiFsTreeClassesInterface as interface };
export default function ({ params, atRule, applyNoScopes, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultColor: 'main', defaultStyle: 'solid', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    vars.push(`
      /**
        * @name          Fs Tree
        * @namespace          sugar.css.ui
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
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-fs-tree${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} filesystem tree style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <ul class="s-fs-tree${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *       <li class="active">
            *           <i class="s-icon:folder-open"></i>
            *           <span tabindex="0">${__faker.name.findName()}</span>
            *           <ul>
            *               <li>
            *                   <i class="s-icon:file"></i>
            *                   <a tabindex="0">${__faker.name.findName()}</a>
            *               </li>
            *               <li class="active">
            *                   <i class="s-icon:folder-open"></i>
            *                   <span tabindex="0">${__faker.name.findName()}</span>
                                <ul>
                    *               <li>
                    *                   <i class="s-icon:file-pdf"></i>
                    *                   <a tabindex="0">${__faker.name.findName()}</a>
                    *               </li>
                    *               <li>
                    *                   <i class="s-icon:file-code"></i>
                    *                   <a tabindex="0">${__faker.name.findName()}</a>
                    *               </li>
                    *              <li>
                    *                   <i class="s-icon:file-image"></i>
                    *                   <a tabindex="0">${__faker.name.findName()}</a>
                    *               </li>
                    *           </ul>
            *               </li>
            *              <li>
            *                   <i class="s-icon:file-archive"></i>
            *                   <a tabindex="0">${__faker.name.findName()}</a>
            *               </li>
            *           </ul>
            *           <li class="s-disabled">
        *                   <i class="s-icon:file"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
            *           <li>
        *                   <i class="s-icon:file-code"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
            *       </li>
            *   </ul>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL Support</h3>
        *   <ul class="s-fs-tree">
        *       <li class="active">
        *           <i class="s-icon:folder-open"></i>
        *           <span tabindex="0">${__faker.name.findName()}</span>
        *           <ul>
        *               <li>
        *                   <i class="s-icon:file"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
        *               <li class="active">
        *                   <i class="s-icon:folder-open"></i>
        *                   <span tabindex="0">${__faker.name.findName()}</span>
                            <ul>
                *               <li>
                *                   <i class="s-icon:file-pdf"></i>
                *                   <a tabindex="0">${__faker.name.findName()}</a>
                *               </li>
                *               <li>
                *                   <i class="s-icon:file-code"></i>
                *                   <a tabindex="0">${__faker.name.findName()}</a>
                *               </li>
                *              <li>
                *                   <i class="s-icon:file-image"></i>
                *                   <a tabindex="0">${__faker.name.findName()}</a>
                *               </li>
                *           </ul>
        *               </li>
        *              <li>
        *                   <i class="s-icon:file-archive"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
        *           </ul>
        *           <li>
    *                   <i class="s-icon:file-code"></i>
    *                   <a tabindex="0">${__faker.name.findName()}</a>
    *               </li>
        *           <li>
    *                   <i class="s-icon:file-code"></i>
    *                   <a tabindex="0">${__faker.name.findName()}</a>
    *               </li>
        *       </li>
        *   </ul>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scales</h3>
        *   <ul class="s-fs-tree s-scale:08">
        *       <li class="active">
        *           <i class="s-icon:folder-open"></i>
        *           <span tabindex="0">${__faker.name.findName()}</span>
        *           <ul>
        *               <li>
        *                   <i class="s-icon:file"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
        *               <li>
        *                   <i class="s-icon:folder-open"></i>
        *                   <span tabindex="0">${__faker.name.findName()}</span>
        *               </li>
        *              <li>
        *                   <i class="s-icon:file-archive"></i>
        *                   <a tabindex="0">${__faker.name.findName()}</a>
        *               </li>
        *           </ul>
        *           <li>
    *                   <i class="s-icon:file-code"></i>
    *                   <a tabindex="0">${__faker.name.findName()}</a>
    *               </li>
        *           <li>
    *                   <i class="s-icon:file-code"></i>
    *                   <a tabindex="0">${__faker.name.findName()}</a>
    *               </li>
        *       </li>
        *   </ul>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
        * @name           s-fs-tree
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>${__theme().config('ui.fsTree.defaultStyle')}</yellow>" filesystem tree
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
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-fs-tree {
        @sugar.color(${finalParams.defaultColor});
        @sugar.ui.fsTree();
      }
  `);
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.list
            * @type           CssClass
            * 
            * This class represent some lists in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <ul class="s-fs-tree">
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
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                .s-fs-tree {
                    ${jsObjectToCssProperties(__theme().config('ui.fsTree.rhythmVertical'))}
                } 
            }
        `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztLQUN0RDtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxNQUFBLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxtQ0FBSSxPQUFPO0tBQ2pFO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FDdkM7Q0FDSixDQUFDO0FBVU4sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0s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