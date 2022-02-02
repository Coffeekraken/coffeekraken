import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

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
                default: __STheme.config('ui.list.defaultStyle') ?? 'dl',
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

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/list.js`],
    };
}

export default function ({
    params,
    atRule,
    applyNoScopes,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    applyNoScopes: Function;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        styles: [],
        defaultStyle: 'dl',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Lists
        * @namespace          sugar.css.ui
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
                return ` * @example        html       ${style}
            *   <ul class="s-list\:${style} ${
                    style === 'ol' ? 's-color:accent s-scale:15' : ''
                }">
            *     <li>${
                style === 'icon' ? `<i class="s-icon\:user"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon'
                    ? `<i class="s-icon\:heart s-color:accent"></i>`
                    : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon'
                    ? `<i class="s-icon\:fire s-color:error"></i>`
                    : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * `;
            })
            .join('\n')}
        *
        * @example        html          RTL
        * <div dir="rtl">
        *   <ul class="s-list\:ul s-color:accent s-mbe:30">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list\:ol s-color:accent s-mbe:30">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        *   <ul class="s-list\:icon s-color:accent s-mbe:30">
        *     <li><i class="s-icon\:user"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li><i class="s-icon\:heart s-color:error"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example          html         Colors (none-exhaustive)
        *   <ul class="s-list s-scale\:12 s-color:accent">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:complementary">${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:error">${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example          html            Vertical Rhythm / Text format
        *   <div class="s-format:text s-rhythm:vertical">
        *       <ul>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ul>
        *       <ol>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ol>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-list
            * @namespace      sugar.css.ui.list
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
        ).code(`
        .s-list {
            @sugar.ui.list($scope: bare);
        }
    `);
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(
                () => `/**
                * @name           s-list${
                    finalParams.defaultStyle === style ? '' : `:${style}`
                }
                * @namespace      sugar.css.ui.list
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
           `,
            ).code(`
            .s-list${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.list($scope: lnf);
            }
        `);
        });
    }

    // ul
    vars.comment(
        () => `/**
        * @name           s-list--ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list\:ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
    ).code(`
      .s-list--ul {
        @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
      }
  `);

    // ul:icon
    vars.comment(
        () => `/**
        * @name           s-list--icon
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list\:icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`,
    );
    vars.code(
        () => `
      .s-list--icon {
          @sugar.ui.list($style: icon, $scope: '${finalParams.scope.join(
              ',',
          )}');
      }`,
    );

    // ol
    vars.comment(
        () => `/**
        * @name           s-list--ol
        * @namespace      sugar.css.ui.list
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
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
    ).code(`
      .s-list--ol {
        @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
      }   
  `);

    // dl
    vars.comment(
        () => `/**
        * @name           s-list--dl
        * @namespace      sugar.css.ui.list
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
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
    ).code(`
      .s-list--dl {
        @sugar.ui.list($style: dl, $scope: '${finalParams.scope.join(',')}');
      }   
  `);

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-format:text ul
            * @namespace      sugar.css.ui.list
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
        ).code(`
            @sugar.format.text {
                ul {
                    @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `);
        vars.comment(
            () => `/**
            * @name           s-format:text ol
            * @namespace      sugar.css.ui.list
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
        ).code(`
            @sugar.format.text {
                ol {
                    @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `);
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            () => `/**
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
        ).code(`
            @sugar.rhythm.vertical {
                ul, .s-list--ul,
                ol, .s-list--ol {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.config('ui.list.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    return vars;
}
