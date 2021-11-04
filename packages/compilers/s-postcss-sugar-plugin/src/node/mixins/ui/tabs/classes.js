var _a;
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
}
postcssSugarPluginUiListClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __STheme.config('ui.tabs.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
};
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid' }, params);
    const vars = [];
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
        return ` * @cssClass     s-tabs${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} tabs style`;
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
            *   <ul class="s-tabs${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent">
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
        * @name           s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>${style}</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}">
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQ3hELG1EQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsbUNBQUksT0FBTztLQUM5RDtDQUNKLENBQUM7QUFRTixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDakIsWUFBWSxFQUFFLE9BQU8sSUFDbEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFpQkosV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sMEJBQ0gsS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3ZE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