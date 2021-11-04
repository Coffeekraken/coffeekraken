var _a;
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
        default: (_a = __STheme.config('ui.badge.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:40 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:20">${style} style</h3>
            *   <a class="s-badge:${style} s-mie:20">Say hello!</a>
            *   <a class="s-badge:${style} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge:${style} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge:${style} s-color:error">Say hello!</a>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- shapes -->
        * <div class="s-font:40 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:20">Shapes</h3>
        *   <a class="s-badge:square s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:pill s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:outline:square s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge:outline:pill s-mie:20 s-mbe:20">Say hello!</a>
        * </div>
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:20">Scales</h3>
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
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
        * <a class="s-badge:${style}">I'm a cool ${style} badge</a>
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
        * <a class="s-badge:square">I'm a cool badge</a>
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
        * <a class="s-badge:pill">I'm a cool badge</a>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1FBQzVCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7S0FDaEM7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7UUFDNUIsT0FBTyxFQUFFLE1BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxtQ0FBSSxPQUFPO0tBQy9EO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFDNUIsWUFBWSxFQUFFLE9BQU8sSUFDbEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7VUFXSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTywyQkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQsd0JBQXdCLEtBQUssY0FBYyxDQUFDO0lBQ2hELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztVQU1iLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLFdBQVcsS0FBSzs7NkRBRXNCLEtBQUs7b0NBQzlCLEtBQUs7b0NBQ0wsS0FBSztvQ0FDTCxLQUFLO29DQUNMLEtBQUs7O2VBRTFCLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F3QmxCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUM7b0NBQ2tCLEtBQUs7Ozs7Ozs7OEJBT1gsS0FBSyxnQkFBZ0IsS0FBSzs7OztTQUkvQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDO2tCQUNBLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO3NDQUNsQyxLQUFLOztLQUV0QyxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O1NBY0wsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9