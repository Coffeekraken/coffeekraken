import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
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
    const layoutConfig = __theme().config('layout');
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
    const spaces = __theme().config('space');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQ3hELG1EQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sWUFBWSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxHQUFHLEdBQ0wsYUFBYSxLQUFLLFNBQVM7WUFDdkIsQ0FBQyxDQUFDLGFBQWE7WUFDZixDQUFDLENBQUMsZUFBZSxhQUFhLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNPLEdBQUc7Ozs7OztzREFNMEIsYUFBYTs7O3NCQUc3QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7T0FJcEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2tDQUNLLGFBQWE7TUFDekMsQ0FBQyxDQUFDO0lBQ0osQ0FB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