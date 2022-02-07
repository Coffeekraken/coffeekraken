import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';
/**
 * @name           classes
 * @namespace      node.mixins.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the layout helper classes like s-layout:12, s-container, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.layout.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    const layoutConfig = __STheme.config('layout');
    const containers = layoutConfig.container;
    Object.keys(containers).forEach((containerName) => {
        const cls = containerName === 'default'
            ? `s-container`
            : `s-container:${containerName}`;
        vars.comment(() => `/**
      * @name          ${cls}
      * @namespace          sugar.css.layout
      * @type               CssClass
      * @platform       css
      * @status         beta
      * 
      * This class allows you to apply the "<yellow>${containerName}</yellow>" container styling to any HTMLElement
      * 
      * @example        html
      * <div class="${cls.replace(':', ':')}">
      *     <h1 class="s-h1">Hello world</h1>
      * </div>
      */
    `).code(`
      .${cls.replace(':', '--')} {
          @sugar.layout.container(${containerName});
      }`);
    });
    const grids = layoutConfig.grid;
    Object.keys(grids).forEach((id) => {
        const grid = grids[id];
        vars.comment(() => `
        /**
         * @name       s-grid:${id}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      postcss
         * @status      beta
         * 
         * This class represent a grid of "<yellow>${id}</yellow> columns"
         * 
         * @example     html
         * <div class="s-container s-grid:${id}">
         *    ${Array(12)
            .map((idx) => {
            return `<div>I'm the grid item ${idx}</div>`;
        })
            .join('\n')}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      `).code(`
        .s-grid--${id} {
          display: grid;
          grid-template-columns: repeat(${grid}, minmax(0, 1fr));
        }
      `);
    });
    const layouts = layoutConfig.layout;
    Object.keys(layouts).forEach((id) => {
        const layout = layouts[id];
        const colsCount = __unique(layout.split(/\n\s/)).length;
        vars.comment(() => `
      /**
       * @name       s-layout:${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      postcss
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
      .s-layout--${id} {
        @sugar.layout(${layout}, $scope: bare);
      }
    `);
    });
    // vars.comment(
    //         () => `
    //   /**
    //    * @name       s-layout:${id}
    //    * @namespace     sugar.css.layout
    //    * @type          CssClass
    //    * @platform      postcss
    //    * @status      beta
    //    * 
    //    * This class represent a layout of "<yellow>${layout}</yellow>"
    //    * 
    //    * @example     html
    //    * <div class="s-container s-layout:${id}">
    //    *    ${Array(colsCount)
    //        .map((idx) => {
    //            return `<div>I'm the area ${idx}</div>`;
    //        })
    //        .join('\n')}
    //    * </div>
    //    * 
    //    * @since     2.0.0
    //    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   `,
    //     ).code(`
    //   .s-layout--${id} {
    //     @sugar.layout(${layout}, $scope: bare);
    //   }
    // `);
    const spaces = __STheme.config('space');
    Object.keys(spaces).forEach((spaceName) => {
        const clsX = `s-layout:gap-x-${spaceName}`.replace('-default', '');
        const clsY = `s-layout:gap-y-${spaceName}`.replace('-default', '');
        const cls = `s-layout:gap-${spaceName}`.replace('-default', '');
        vars.comment(() => `
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      postcss
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
      .${clsX.replace(':', '--')} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `);
        vars.comment(() => `
      /**
       * @name       ${clsY}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      postcss
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
        .${clsY.replace(':', '--')} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `);
        vars.comment(() => `
      /**
       * @name       ${cls}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      postcss
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
      .${cls.replace(':', '--')} > * {
        padding: sugar.space(${spaceName});
      }
    `);
    });
    vars.comment(() => `
     /**
       * @name       s-layout:gap-between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      postcss
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
  `);
    // align items
    ['start', 'end', 'center', 'stretch'].forEach((align) => {
        vars.comment(() => `
      /**
         * @name       s-layout:align-${align}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      postcss
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `).code(`
        .s-layout--align-${align} {
          align-items: ${align};
        }
    `);
    });
    // justify items
    ['start', 'end', 'center', 'stretch'].forEach((justify) => {
        vars.comment(() => `
      /**
         * @name       s-layout:justify-${justify}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      postcss
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `).code(`
        .s-layout--justify-${justify} {
          justify-items: ${justify};
        }
    `);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0MsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1FBQzlDLE1BQU0sR0FBRyxHQUNMLGFBQWEsS0FBSyxTQUFTO1lBQ3ZCLENBQUMsQ0FBQyxhQUFhO1lBQ2YsQ0FBQyxDQUFDLGVBQWUsYUFBYSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5QkFDTyxHQUFHOzs7Ozs7c0RBTTBCLGFBQWE7OztzQkFHN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7O0tBSXRDLENBQ0ksQ0FBQyxJQUFJLENB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