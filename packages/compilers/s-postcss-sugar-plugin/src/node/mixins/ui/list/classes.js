import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static get _definition() {
        var _a;
        return {
            styles: {
                type: 'String[]',
                values: ['ul', 'ol', 'icon'],
                default: ['ul', 'ol', 'icon'],
            },
            defaultStyle: {
                type: 'String',
                values: ['ul'],
                default: (_a = __STheme.config('ui.list.defaultStyle')) !== null && _a !== void 0 ? _a : 'ul',
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
export { postcssSugarPluginUiListClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/list.js`],
    };
}
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'ul', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
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
        return ` * @cssClass     s-list${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} list style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <ul class="s-list\:${style} ${style === 'ol' ? 's-color:accent s-scale:15' : ''}">
            *     <li>${style === 'icon' ? `<i class="s-icon\:user"></i>` : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${style === 'icon'
            ? `<i class="s-icon\:heart s-color:accent"></i>`
            : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${style === 'icon'
            ? `<i class="s-icon\:fire s-color:error"></i>`
            : ''}${__faker.name.title()} ${__faker.name.findName()}</li>
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
    if (finalParams.scope.includes('bare')) {
        vars.push(`/**
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
        .s-list {
            @sugar.ui.list($scope: bare);
        }
    `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.push(`/**
                * @name           s-list${finalParams.defaultStyle === style ? '' : `:${style}`}
                * @namespace      sugar.css.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" list
                * 
                * @feature       Support vertical rhythm
                * 
                * @example        html
                * <ul class="s-list${finalParams.defaultStyle === style ? '' : `:${style}`}">
                *   <li>Hello</li>
                *   <li>World</li>
                * </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
            .s-list${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.list($scope: lnf);
            }
        `);
        });
    }
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
        @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
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
          @sugar.ui.list($style: icon, $scope: '${finalParams.scope.join(',')}');
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
        @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
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
                    @sugar.ui.list($style: ul, $scope: '${finalParams.scope.join(',')}');
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
                    @sugar.ui.list($style: ol, $scope: '${finalParams.scope.join(',')}');
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
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.list.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ2hDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsTUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLG1DQUFJLElBQUk7YUFDM0Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN2QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsTUFBTSxVQUFVLFlBQVk7SUFDeEIsT0FBTztR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