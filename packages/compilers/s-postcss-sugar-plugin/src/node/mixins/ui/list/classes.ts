import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
import __faker from 'faker';

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['ul', 'ol', 'icon'],
            default: ['ul', 'ol', 'icon'],
        },
        defaultColor: {
            type: 'String',
            default: __theme().config('ui.list.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['ul'],
            default: __theme().config('ui.list.defaultStyle') ?? 'ul',
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

export interface IPostcssSugarPluginUiListClassesParams {
    styles: ('ul' | 'ol' | 'icon')[];
    defaultColor: string;
    defaultStyle: 'ul' | 'ol' | 'icon';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        styles: [],
        defaultColor: 'ui',
        defaultStyle: 'ul',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    vars.push(`
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
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
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
            * </div>
            * `;
            })
            .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL</h3>
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
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors</h3>
        *   <ul class="s-list s-scale\:12 s-color:accent">
        *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:complementary">${__faker.name.title()} ${__faker.name.findName()}</li>
        *     <li class="s-color:error">${__faker.name.title()} ${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Vertical rhythm and text formatting</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`ul\` or \`ol\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
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
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
        * @name           s-list
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>${__theme().config(
            'ui.list.defaultStyle',
        )}</yellow>" list
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
      .s-list {
        @sugar.ui.list();
      }
  `);

    // ul
    vars.push(`/**
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
      .s-list--ul {
        @sugar.ui.list($style: ul, $scope: lnf);
      }
  `);

    // ul:icon
    vars.push(`/**
        * @name           s-list--ul.s-list--icon
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
      */`);
    vars.push(`
      .s-list--icon {
          @sugar.ui.list($style: icon, $scope: lnf);
      }`);

    // ol
    vars.push(`/**
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
      .s-list--ol {
        @sugar.ui.list($style: ol, $scope: lnf);
      }   
  `);

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
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
            @sugar.format.text {
                ul {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `);
        vars.push(`/**
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
            @sugar.format.text {
                ol {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(
                        ',',
                    )}');
                } 
            }
        `);
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
            @sugar.rhythm.vertical {
                ul, .s-list--ul,
                ol, .s-list--ol {
                    ${jsObjectToCssProperties(
                        __theme().config('ui.list.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    replaceWith(vars);
}
