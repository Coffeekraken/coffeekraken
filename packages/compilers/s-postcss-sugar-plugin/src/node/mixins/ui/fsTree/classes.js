var _a;
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
        default: __STheme.config('ui.fsTree.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __STheme.config('ui.fsTree.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
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
        * This class represent an "<yellow>${__STheme.config('ui.fsTree.defaultStyle')}</yellow>" filesystem tree
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
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.fsTree.rhythmVertical'))}
                } 
            }
        `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7S0FDckQ7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsTUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG1DQUFJLE9BQU87S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztLQUN2QztDQUNKLENBQUM7QUFVTixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEs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