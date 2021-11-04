import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';
/**
 * @name           classes
 * @namespace      node.mixins.layout
 * @type           PostcssMixin
 * @platform      css
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
}
postcssSugarPluginLayoutClassesInterface.definition = {};
export { postcssSugarPluginLayoutClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const layoutConfig = __STheme.config('layout');
    const containers = layoutConfig.container;
    Object.keys(containers).forEach((containerName) => {
        const cls = containerName === 'default'
            ? `s-container`
            : `s-container:${containerName}`;
        vars.push(`/**
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
    .${cls.replace(':', '--')} {
        @sugar.layout.container(${containerName});
    }`);
    });
    const grids = layoutConfig.grid;
    Object.keys(grids).forEach((id) => {
        const grid = grids[id];
        vars.push(`
        /**
         * @name       s-grid:${id}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
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
        vars.push(`
      /**
       * @name       s-layout:${id}
       * @namespace     sugar.css.layout
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
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-layout--${id} {
        @sugar.layout(${layout}, $scope: bare);
      }
    `);
    });
    const spaces = __STheme.config('space');
    Object.keys(spaces).forEach((spaceName) => {
        const clsX = `s-layout:gutter-x-${spaceName}`.replace('-default', '');
        const clsY = `s-layout:gutter-y-${spaceName}`.replace('-default', '');
        const cls = `s-layout:gutter-${spaceName}`.replace('-default', '');
        vars.push(`
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gutters on your s-layout items
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
      .${clsX.replace(':', '--')} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `);
        vars.push(`
      /**
       * @name       ${clsY}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gutters on your s-layout items
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
        .${clsY.replace(':', '--')} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `);
        vars.push(`
      /**
       * @name       ${cls}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to apply some left and right gutters on your s-layout items
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
      .${cls.replace(':', '--')} > * {
        padding: sugar.space(${spaceName});
      }
    `);
    });
    vars.push(`
     /**
       * @name       s-layout:gutter-between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to specify that you want only gutters between layout items
       * 
       * @example     html
       * <div class="s-layout:123 s-layout:gutter-between">
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
      .s-layout--gutter-between > * {
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
        vars.push(`
      /**
         * @name       s-layout:align-${align}
         * @namespace     sugar.css.layout
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        .s-layout--align-${align} {
          align-items: ${align};
        }
    `);
    });
    // justify items
    ['start', 'end', 'center', 'stretch'].forEach((justify) => {
        vars.push(`
      /**
         * @name       s-layout:justify-${justify}
         * @namespace     sugar.css.layout
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        .s-layout--justify-${justify} {
          justify-items: ${justify};
        }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQ3hELG1EQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0MsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1FBQzlDLE1BQU0sR0FBRyxHQUNMLGFBQWEsS0FBSyxTQUFTO1lBQ3ZCLENBQUMsQ0FBQyxhQUFhO1lBQ2YsQ0FBQyxDQUFDLGVBQWUsYUFBYSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxHQUFHOzs7Ozs7c0RBTTBCLGFBQWE7OztzQkFHN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7O09BSXBDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztrQ0FDSyxhQUFhO01BQ3pDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FB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