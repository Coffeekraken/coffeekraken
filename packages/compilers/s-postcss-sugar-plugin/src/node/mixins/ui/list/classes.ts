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
        defaultStyle: {
            type: 'String',
            values: ['ul', 'ol', 'icon'],
            default: __theme().config('ui.list.defaultStyle') ?? 'ul',
        },
    };
}

export interface IPostcssSugarPluginUiListClassesParams {
    styles: ('ul' | 'ol' | 'icon')[];
    defaultStyle: 'ul' | 'ol' | 'icon';
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        styles: [],
        defaultStyle: 'ul',
        ...params,
    };

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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-list${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} list style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <ul class="s-list\:${style} ${style === 'ol' ? 's-ui:accent s-scale:15' : ''}">
            *     <li>${
                style === 'icon' ? `<i class="s-icon\:user"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon' ? `<i class="s-icon\:heart s-ui\:accent"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${
                style === 'icon' ? `<i class="s-icon\:fire s-ui\:error"></i>` : ''
            }${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
            })
            .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mb\:50" dir="rtl">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">RTL</h3>
            *   <ul class="s-list\:ul s-ui\:accent s-mb\:30">
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            *   <ul class="s-list\:ol s-ui\:accent s-mb\:30">
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            *   <ul class="s-list\:icon s-ui\:accent s-mb\:30">
            *     <li><i class="s-icon\:user"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li><i class="s-icon\:heart s-ui\:error"></i> ${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
            * </div>
        * 
        * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Colors</h3>
            *   <ul class="s-list s-scale\:12 s-ui\:accent">
            *     <li>${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li class="s-ui\:complementary">${__faker.name.title()} ${__faker.name.findName()}</li>
            *     <li class="s-ui\:error">${__faker.name.title()} ${__faker.name.findName()}</li>
            *   </ul>
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
        * This class represent an "<yellow>${__theme().config('ui.list.defaultStyle')}</yellow>" list
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

    replaceWith(vars);
}
