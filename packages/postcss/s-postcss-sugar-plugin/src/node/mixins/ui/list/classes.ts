import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.list
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 *Generate the list classes
 *
 * @param       {('dl'|'ul'|'ol'|'icon')[]}                           [styles=['dl','ul','ol','icon']]         The style(s) you want to generate
 * @param       {'dl'|'ul'|'ol'|'icon'}                [defaultStyle='theme.ui.list.defaultStyle']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.list.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: ['dl', 'ul', 'ol', 'icon'],
            },
            defaultStyle: {
                type: 'String',
                values: ['dl', 'ul', 'ol', 'icon'],
                default: __STheme.get('ui.list.defaultStyle') ?? 'dl',
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
    styles: ('dl' | 'ul' | 'ol' | 'icon')[];
    defaultStyle: 'dl' | 'ul' | 'ol' | 'icon';
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
        styles: [],
        defaultStyle: 'dl',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Lists
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/lists
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply list styles to any ul, ol, dl, etc...
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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-list${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} list style`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style ${
                    params.defaultStyle === style
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <ul class="s-list:${style} ${
                    style === 'ol' ? 's-color:accent s-scale:15' : ''
                }">
            *     <li>${
                style === 'icon' ? `<i class="s-icon:user"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon'
                    ? `<i class="s-icon:heart s-color:accent"></i>`
                    : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon'
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
            @sugar.ui.list($scope: bare);
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
                * @name           s-list${
                    finalParams.defaultStyle === style ? '' : `:${style}`
                }
                * @namespace          sugar.style.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" list
                * 
                * @feature       Support vertical rhythm
                * 
                * @example        html
                * <ul class="s-list${
                    finalParams.defaultStyle === style ? '' : `:${style}`
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
            .s-list${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.list($scope: lnf);
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
        * @name           s-list--ul
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
      .s-list--ul {
        @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
      }
  `,
        {
            type: 'CssClass',
        },
    );

    // ul:icon
    vars.comment(
        () => `/**
        * @name           s-list--icon
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
      .s-list--icon {
          @sugar.ui.list($style: icon, $scope: '${finalParams.scope.join(
              ',',
          )}');
      }`,
        {
            type: 'CssClass',
        },
    );

    // ol
    vars.comment(
        () => `/**
        * @name           s-list--ol
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--ol">
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
      .s-list--ol {
        @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
      }   
  `,
        {
            type: 'CssClass',
        },
    );

    // dl
    vars.comment(
        () => `/**
        * @name           s-list--dl
        * @namespace          sugar.style.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>dl</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--dl">
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
      .s-list--dl {
        @sugar.ui.list($style: dl, $scope: '${finalParams.scope.join(',')}');
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
            @sugar.format.text {
                ul {
                    @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(
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
            @sugar.format.text {
                ol {
                    @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(
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
            @sugar.rhythm.vertical {
                ul, .s-list--ul,
                ol, .s-list--ol {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.list.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    return vars;
}
