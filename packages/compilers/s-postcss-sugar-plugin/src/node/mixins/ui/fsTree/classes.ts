import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
    static definition = {
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
            default: __STheme.config('ui.fsTree.defaultStyle') ?? 'solid',
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

export interface IPostcssSugarPluginUiFsTreelassesParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiFsTreeClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/fsTree.js`],
    };
}

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFsTreelassesParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFsTreelassesParams = {
        styles: [],
        defaultColor: 'main',
        defaultStyle: 'solid',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

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
                return ` * @cssClass     s-fs-tree${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} filesystem tree style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <ul class="s-fs-tree${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
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
        * This class represent an "<yellow>${__STheme.config(
            'ui.fsTree.defaultStyle',
        )}</yellow>" filesystem tree
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
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.config('ui.fsTree.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    return vars;
}
