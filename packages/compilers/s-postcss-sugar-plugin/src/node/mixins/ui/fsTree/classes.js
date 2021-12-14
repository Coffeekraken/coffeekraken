import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
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
                default: (_a = __STheme.config('ui.fsTree.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'tf', 'vr'],
                default: ['bare', 'lnf', 'shape', 'tf', 'vr'],
            },
        };
    }
}
export { postcssSugarPluginUiFsTreeClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/fsTree.js`],
    };
}
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
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
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-fs-tree${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} filesystem tree shape`;
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
        * <!-- Shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
            *   <ul class="s-fs-tree${shape === finalParams.defaultShape ? '' : `:${shape}`}">
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
    if (finalParams.scope.includes('bare')) {
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
            @sugar.ui.fsTree($scope: bare);
        }
    `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.push(`/**
                * @name           s-fs-tree${style === finalParams.defaultStyle ? '' : `:${style}`}
                * @namespace      sugar.css.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${style === finalParams.defaultStyle ? '' : `:${style}`}">
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
            .s-fs-tree${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.fsTree($style: ${style}, $scope: lnf);
            }
        `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.push(`/**
                * @name           s-fs-tree${shape === finalParams.defaultShape ? '' : `:${shape}`}
                * @namespace      sugar.css.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${shape}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${shape === finalParams.defaultShape ? '' : `:${shape}`}">
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
            .s-fs-tree${shape === finalParams.defaultShape ? '' : `--${shape}`} {
                @sugar.ui.fsTree($shape: ${shape}, $scope: shape);
            }
        `);
        });
    }
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsbUNBQUksT0FBTzthQUNoRTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDaEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBVUQsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE1BQU0sVUFBVSxZQUFZO0lBQ3hCLE9BQU87UUFDSCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxZQUFZLENBQUM7S0FDdEMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsRUFBRSxFQUNWLE1BQU0sRUFBRSxFQUFFLEVBQ1YsWUFBWSxFQUFFLE9BQU8sRUFDckIsWUFBWSxFQUFFLFNBQVMsRUFDdkIsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyw2QkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQsd0JBQXdCLEtBQUssd0JBQXdCLENBQUM7SUFDMUQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNiLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDZCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyx3QkFBd0IsQ0FBQztJQUMxRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyxXQUFXLEtBQUs7OzZEQUVzQixLQUFLO3NDQUVsRCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7Ozs2Q0FHaUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7a0RBSWxCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O3FEQUlwQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzswREFJbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7MERBSXZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OzBEQUl2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O2tEQU0vQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OENBSzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OzhDQUl2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7ZUFLdEQsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7OztVQUdiLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLFdBQVcsS0FBSzs7NkRBRXNCLEtBQUs7c0NBRWxELEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDs7OzZDQUdpQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztrREFJbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7cURBSXBCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OzBEQUlsQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzswREFJdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7MERBSXZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7a0RBTS9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs4Q0FLM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OENBSXZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OztlQUt0RCxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7eUNBUWtCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OzhDQUlsQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztpREFJcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0RBSWxCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O3NEQUl2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztzREFJdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs4Q0FNL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OzBDQUszQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzswQ0FJdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozt5Q0FZeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OENBSWxCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O2lEQUlwQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs4Q0FJMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OzBDQUszQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzswQ0FJdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OztLQVM1RCxDQUFDLENBQUM7SUFFSCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2lEQUsrQixRQUFRLENBQUMsTUFBTSxDQUNoRCx3QkFBd0IsQ0FDM0I7Ozs7Ozs7dURBTzBDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs4REFFaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OERBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzZEQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7MERBRTFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBEQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVU1RSxDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDOzZDQUVGLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDs7OztxREFJcUMsS0FBSzs7O3dDQUl0QyxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7OzJEQUUyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7a0VBRWhCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2tFQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpRUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzhEQUUxQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7d0JBUXJFLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUN4RDsyQ0FDK0IsS0FBSzs7U0FFdkMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDOzZDQUVGLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDs7OztxREFJcUMsS0FBSzs7O3dDQUl0QyxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7OzJEQUUyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7a0VBRWhCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2tFQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpRUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzhEQUUxQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7d0JBUXJFLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUN4RDsyQ0FDK0IsS0FBSzs7U0FFdkMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozt1REFhcUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzhEQUVoQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NkRBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzswREFFMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MERBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7O3NCQVUzRCxRQUFRLENBQUMsdUJBQXVCLENBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FDOUM7OztTQUdaLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9