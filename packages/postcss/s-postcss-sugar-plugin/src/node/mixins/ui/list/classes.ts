import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @as            @s.ui.list.classes
 * @namespace     node.mixin.ui.list
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the list classes
 *
 * @param       {('dl'|'ul'|'ol'|'icon')[]}                           [lnfs=['dl','ul','ol','icon']]         The style(s) you want to generate
 * @param       {'dl'|'ul'|'ol'|'icon'}                [defaultLnf='theme.ui.list.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.list.classes
 *
 * @example     css
 * \@s.ui.list.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: ['dl', 'ul', 'ol', 'icon'],
            },
            defaultLnf: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: __STheme.get('ui.list.defaultLnf') ?? 'dl',
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

export interface IPostcssSugarPluginUiListClassesParams {
    lnfs: ('dl' | 'ul' | 'ol' | 'icon')[];
    defaultLnf: 'dl' | 'ul' | 'ol' | 'icon';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        lnfs: [],
        defaultLnf: 'dl',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          List
        * @namespace          sugar.style.ui.list
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/lists
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply list lnfs to any ul, ol, dl, etc...
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.ui.list.classes;
        * 
        * .my-list {
        *   \@s.ui.list;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-list${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} list lnf`;
            })
            .join('\n')}
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf ${
                    params.defaultLnf === lnf
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <ul class="s-list:${lnf} ${
                    lnf === 'ol' ? 's-color:accent s-scale:15' : ''
                }">
            *     <li>${
                lnf === 'icon' ? `<i class="s-icon:user"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                lnf === 'icon'
                    ? `<i class="s-icon:heart s-color:accent"></i>`
                    : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                lnf === 'icon'
                    ? `<i class="s-icon:fire s-color:error"></i>`
                    : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * `;
            })
            .join('\n')}
        *
        * @example        html          RTL Support
        * <div dir="rtl">
        *   <ul class="s-list:ul s-color:accent s-mbe:30">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list:ol s-color:accent s-mbe:30">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list:icon s-color:accent s-mbe:30">
        *     <li><i class="s-icon:user"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li><i class="s-icon:heart s-color:error"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example          html         Colors (none-exhaustive)
        *   <ul class="s-list:ol s-color:accent">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:complementary">${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:error">${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-list
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent an "<yellow>bare</yellow>" list
            * 
            * @feature       Support vertical rhythm
            * 
            * @example        html
            * <ul class="s-list">
            *   <li>Hello</li>
            *   <li>World</li>
            * </ul>
            * 
            * @since       2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
        .s-list {
            @s.ui.list($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(
                () => `/**
                * @name           s-list${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                }
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${lnf}</yellow>" list
                * 
                * @feature       Support vertical rhythm
                * 
                * @example        html
                * <ul class="s-list${
                    finalParams.defaultLnf === lnf ? '' : `$lnf:${lnf}`
                }">
                *   <li>Hello</li>
                *   <li>World</li>
                * </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `,
            ).code(
                `
            .s-list${
                finalParams.defaultLnf === lnf ? '' : `-${lnf}`
            }:not(.s-bare) {
                @s.ui.list($scope: lnf);
            }
        `,
                {
                    type: 'CssClass',
                },
            );
        });
    }

    // ul
    vars.comment(
        () => `/**
        * @name           s-list-ul
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list:ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
      .s-list-ul {
        @s.ui.list($lnf: ul, $scope: '${finalParams.scope.join(',')}');
      }
  `,
        {
            type: 'CssClass',
        },
    );

    // ul:icon
    vars.comment(
        () => `/**
        * @name           s-list-icon
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list:icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
    );
    vars.code(
        () => `
      .s-list-icon {
          @s.ui.list($lnf: icon, $scope: '${finalParams.scope.join(',')}');
      }`,
        {
            type: 'CssClass',
        },
    );

    // ol
    vars.comment(
        () => `/**
        * @name           s-list-ol
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list-ol">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
      .s-list-ol {
        @s.ui.list($lnf: ol, $scope: '${finalParams.scope.join(',')}');
      }   
  `,
        {
            type: 'CssClass',
        },
    );

    // dl
    vars.comment(
        () => `/**
        * @name           s-list-dl
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>dl</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list-dl">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
      .s-list-dl {
        @s.ui.list($lnf: dl, $scope: '${finalParams.scope.join(',')}');
      }   
  `,
        {
            type: 'CssClass',
        },
    );

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-format:text ul
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent a simple ul tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <ul>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ul>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @s.format.text {
                ul {
                    @s.ui.list($lnf: ul, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );

        vars.comment(
            () => `/**
            * @name           s-format:text ol
            * @namespace          sugar.style.ui.list
            * @type           CssClass
            * 
            * This class represent a simple ol tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <ol>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ol>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @s.format.text {
                ol {
                    @s.ui.list($lnf: ol, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `,
            {
                type: 'CssClass',
            },
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
            *   <ul class="s-list:ul">
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ul>
            *   <ol class="s-list:ol">
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *       <li>Hello world</li>
            *   </ol>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(`
            @s.rhythm.vertical {
                ul, .s-list-ul,
                ol, .s-list-ol {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.list.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    return vars;
}
