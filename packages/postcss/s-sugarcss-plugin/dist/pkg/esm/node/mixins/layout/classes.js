import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __unique } from '@coffeekraken/sugar/array';
/**
 * @name           classes
 * @as              @s.layout.classes
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the layout helper classes like s-layout:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.layout.classes
 *
 * @example        css
 * @s.layout.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginLayoutClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginLayoutClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const layoutConfig = __STheme.get('layout');
    const layouts = layoutConfig.layout;
    Object.keys(layouts).forEach((id) => {
        const layout = layouts[id];
        const colsCount = __unique(layout.split(/\n\s/)).length;
        vars.comment(() => `
      /**
       * @name       s-layout:${id}
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-layout:${id}">
       *    ${Array(colsCount)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-layout-${id} {
        @s.layout(${layout}, $scope: bare);
      }
    `, { type: 'CssClass' });
    });
    // align items
    ['start', 'end', 'center', 'stretch'].forEach((align) => {
        vars.comment(() => `
      /**
         * @name       s-layout:align-${align}
         * @namespace          sugar.style.helpers.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to align all the items to "${align}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:align-${align}">
         *    ${Array(3)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-layout-align-${align} {
          align-items: ${align};
        }
    `, { type: 'CssClass' });
    });
    // justify items
    ['start', 'end', 'center', 'stretch'].forEach((justify) => {
        vars.comment(() => `
      /**
         * @name       s-layout:justify-${justify}
         * @namespace          sugar.style.helpers.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to justify all the items to "${justify}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:justify-${justify}">
         *    ${Array(3)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-layout-justify-${justify} {
          justify-items: ${justify};
        }
    `, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1QyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7O2dDQUVjLEVBQUU7Ozs7OztxREFNbUIsTUFBTTs7OzRDQUdmLEVBQUU7Y0FDaEMsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQzVDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztPQU1mLENBQ0UsQ0FBQyxJQUFJLENBQ0Y7a0JBQ00sRUFBRTtvQkFDQSxNQUFNOztLQUVyQixFQUNPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxjQUFjO0lBQ2QsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzt3Q0FFc0IsS0FBSzs7Ozs7O3dEQU1XLEtBQUs7OztxREFHUixLQUFLO2dCQUMxQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVCxPQUFPLHFCQUFxQixHQUFHLFFBQVEsQ0FBQztRQUM1QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7UUFNaEIsQ0FDQyxDQUFDLElBQUksQ0FDRjswQkFDYyxLQUFLO3lCQUNOLEtBQUs7O0tBRXpCLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILGdCQUFnQjtJQUNoQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7OzBDQUV3QixPQUFPOzs7Ozs7MERBTVMsT0FBTzs7O3VEQUdWLE9BQU87Z0JBQzlDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQzVDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztRQU1oQixDQUNDLENBQUMsSUFBSSxDQUNGOzRCQUNnQixPQUFPOzJCQUNSLE9BQU87O0tBRTdCLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==