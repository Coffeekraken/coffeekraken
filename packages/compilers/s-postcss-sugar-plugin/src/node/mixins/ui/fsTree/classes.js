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
export default function ({ params, atRule, applyNoScopes, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
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
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ''}
                    ${_example(style, params.defaultStyle === style)}`;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape} shape ${finalParams.defaultShape === shape ? '<span class="s-badge:outline s-scale:05">default</span>' : ''}
                ${_example(shape, params.defaultShape === shape)}`;
    })
        .join('\n')}
        *
        * @example        html       RTL
        * <div dir="rtl">
        ${_example('')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
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
       `).code(`
        .s-fs-tree {
            @sugar.ui.fsTree($scope: bare);
        }
    `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
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
           `).code(`
            .s-fs-tree${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.fsTree($style: ${style}, $scope: lnf);
            }
        `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
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
           `).code(`
            .s-fs-tree${shape === finalParams.defaultShape ? '' : `--${shape}`} {
                @sugar.ui.fsTree($shape: ${shape}, $scope: shape);
            }
        `);
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
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
       `).code(`
            @sugar.rhythm.vertical {
                .s-fs-tree {
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.fsTree.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsbUNBQUksT0FBTzthQUNoRTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDaEQ7U0FDSixD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