import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __unique } from '@coffeekraken/sugar/array';
/**
 * @name           classes
 * @as              @sugar.layout.classes
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the layout helper classes like s-layout:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.layout.classes
 *
 * @example        css
 * \@sugar.layout.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLayoutClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginLayoutClassesInterface as interface };
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
      .s-layout--${id} {
        @sugar.layout(${layout}, $scope: bare);
      }
    `, { type: 'CssClass' });
    });
    const spaces = __STheme.get('space');
    Object.keys(spaces).forEach((spaceName) => {
        const clsX = `s-layout:gap-x-${spaceName}`.replace('-default', '');
        const clsY = `s-layout:gap-y-${spaceName}`.replace('-default', '');
        const cls = `s-layout:gap-${spaceName}`.replace('-default', '');
        vars.comment(() => `
      /**
       * @name       ${clsX}
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsX.replace(':', ':')}">
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
      .${clsX.replace(':', '--')} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `, { type: 'CssClass' });
        vars.comment(() => `
      /**
       * @name       ${clsY}
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsY.replace(':', ':')}">
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
        .${clsY.replace(':', '--')} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `, { type: 'CssClass' });
        vars.comment(() => `
      /**
       * @name       ${cls}
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${cls.replace(':', ':')}">
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
      .${cls.replace(':', '--')} > * {
        padding: sugar.space(${spaceName});
      }
    `, { type: 'CssClass' });
    });
    vars.comment(() => `
     /**
       * @name       s-layout:gap-between
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to specify that you want only gaps between layout items
       * 
       * @example     html
       * <div class="s-layout:123 s-layout:gap-between">
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
      .s-layout--gap-between > * {
        &:first-child {
          padding-left: 0 !important;
        }
        &:last-child {
          padding-right: 0 !important;
        }
      }
  `, { type: 'CssClass' });
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
        .s-layout--align-${align} {
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
        .s-layout--justify-${justify} {
          justify-items: ${justify};
        }
    `, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1QyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7O2dDQUVjLEVBQUU7Ozs7OztxREFNbUIsTUFBTTs7OzRDQUdmLEVBQUU7Y0FDaEMsS0FBSyxDQUFD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