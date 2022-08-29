import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

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
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.fsTree.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.fsTree.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.fsTree.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.fsTree.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
    static get _definition() {
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
                default: __STheme.get('ui.fsTree.defaultStyle') ?? 'solid',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.fsTree.defaultColor'),
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

export interface IPostcssSugarPluginUiFsTreelassesParams {
    styles: 'solid'[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'shape' | 'tf' | 'vr')[];
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
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFsTreelassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFsTreelassesParams = {
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        defaultColor: 'main',
        scope: [],
        ...params,
    };

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

    vars.comment(
        () => `
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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-fs-tree${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} filesystem tree style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-fs-tree${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} filesystem tree shape`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style ${
                    finalParams.defaultStyle === style
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
                    ${_example(style, params.defaultStyle === style)}`;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape} shape ${
                    finalParams.defaultShape === shape
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-fs-tree
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent an "<yellow>${__STheme.get(
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
        .s-fs-tree {
            @sugar.ui.fsTree($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(
                () => `/**
                * @name           s-fs-tree${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }">
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
           `,
            ).code(
                `
            .s-fs-tree${
                style === finalParams.defaultStyle ? '' : `--${style}`
            } {
                @sugar.ui.fsTree($style: ${style}, $scope: lnf);
            }
        `,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(
                () => `/**
                * @name           s-fs-tree${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${shape}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }">
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
           `,
            ).code(
                `
            .s-fs-tree${
                shape === finalParams.defaultShape ? '' : `--${shape}`
            } {
                @sugar.ui.fsTree($shape: ${shape}, $scope: shape);
            }
        `,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-blockquote:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            () => `/**
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @sugar.rhythm.vertical {
                .s-fs-tree {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.fsTree.rhythmVertical'),
                    )}
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
