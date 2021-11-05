import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid'],
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __STheme.config('ui.tabs.defaultStyle') ?? 'solid',
        },
    };
}

export interface IPostcssSugarPluginUiListClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiListClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/tabs.js`],
    };
}

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
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Tabs
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @support          rtl
        * @support          chromium            
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-tabs${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} tabs style`;
            })
            .join('\n')}
        * @cssClass       s-tabs\:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs\:vertical    Display the tabs horizontally
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <ul class="s-tabs${
                style === finalParams.defaultStyle ? '' : `:${style}`
            } s-color:accent">
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * <!-- grow -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Grow</h3>
        *   <ul class="s-tabs\:grow">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- rtl -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">RTL</h3>
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${__faker.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- vertical -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Vertical</h3>
        *   <ul class="s-tabs\:vertical s-color:complementary">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- scaled -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Scaled</h3>
        *   <ul class="s-tabs\:grow s-scale\:13 s-color:accebt">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
        * @name           s-tabs
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>default</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs {
      @sugar.ui.tabs;
    }
  `);

    vars.push(`/**
        * @name           s-tabs--grow
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `);

    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-tabs${
            finalParams.defaultStyle === style ? '' : `:${style}`
        }
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>${style}</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs${
            finalParams.defaultStyle === style ? '' : `:${style}`
        }">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs${finalParams.defaultStyle === style ? '' : `--${style}`} {
      @sugar.ui.tabs($style: ${style}, $scope: lnf);
    }
  `);
    });

    vars.push(`/**
        * @name           s-tabs--vertical
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: direction);
    }
  `);

    return vars;
}
