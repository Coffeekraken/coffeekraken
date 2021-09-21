var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
}
postcssSugarPluginUiBadgeClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid', 'outline'],
        default: ['solid', 'outline'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid', 'outline'],
        default: (_a = __theme().config('ui.badge.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
};
export { postcssSugarPluginUiBadgeClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid', 'outline'], defaultStyle: 'solid' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Badges
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a badge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-badge${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} badge style`;
    })
        .join('\n')}
        * 
        * @cssClass         s-badge\:square       Display your badge with squared corners
        * @cssClass         s-badge\:pill         Display your badge with rounded corners
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font\:40 s-mbe:50">
            *   <h3 class="s-color:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <a class="s-badge\:${style} s-mr\:20">Say hello!</a>
            *   <a class="s-badge\:${style} s-mr\:20 s-ui\:accent">Say hello!</a>
            *   <a class="s-badge\:${style} s-mr\:20 s-ui\:complementary">Say hello!</a>
            *   <a class="s-badge\:${style} s-ui\:error">Say hello!</a>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- shapes -->
        * <div class="s-font\:40 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mb\:20">Shapes</h3>
        *   <a class="s-badge\:square s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge\:pill s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge\:outline\:square s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge\:outline\:pill s-mr\:20 s-mb\:20">Say hello!</a>
        * </div>
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mb\:20">Scales</h3>
        *   <a class="s-badge s-scale\:05 s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge s-scale\:1 s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge s-scale\:12 s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge s-scale\:15 s-mr\:20 s-mb\:20">Say hello!</a>
        *   <a class="s-badge s-scale\:20 s-mb\:20">Say hello!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
        * @name           s-badge
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-badge {
            @sugar.ui.badge($scope: bare);
        }
    `);
    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-badge:${style}
        * @namespace      sugar.css.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge\:${style}">I'm a cool ${style} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push(`
        .s-badge${style === finalParams.defaultStyle ? '' : `--${style}`} {
            @sugar.ui.badge($style: ${style}, $scope: 'lnf,shape');
        }
    `);
    });
    vars.push(`/**
        * @name           s-badge:square
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">squared</s-color>" badge
        * 
        * 
        * 
        * @example        html
        * <a class="s-badge\:square">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--square {
            @sugar.ui.badge($shape: square, $scope: shape);
        }
    `);
    vars.push(`/**
        * @name           s-badge:pill
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">pill</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge\:pill">I'm a cool badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
        .s-badge--pill {
            @sugar.ui.badge($shape: pill, $scope: shape);
        }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1FBQzVCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7S0FDaEM7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7UUFDNUIsT0FBTyxFQUFFLE1BQUEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLG1DQUFJLE9BQU87S0FDaEU7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUM1QixZQUFZLEVBQUUsT0FBTyxJQUNsQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztVQVdKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDJCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxjQUFjLENBQUM7SUFDaEQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1VBTWIsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztnRUFFeUIsS0FBSztxQ0FDaEMsS0FBSztxQ0FDTCxLQUFLO3FDQUNMLEtBQUs7cUNBQ0wsS0FBSzs7ZUFFM0IsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdCbEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQztvQ0FDa0IsS0FBSzs7Ozs7OzsrQkFPVixLQUFLLGdCQUFnQixLQUFLOzs7O1NBSWhELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUM7a0JBQ0EsS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7c0NBQ2xDLEtBQUs7O0tBRXRDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7U0FjTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=