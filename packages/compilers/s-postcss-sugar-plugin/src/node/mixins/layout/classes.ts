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
 * This mixin generate all the layout helper classes like s-grid:12, s-container, etc...
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
  static definition = {};
}

export interface IPostcssSugarPluginLayoutClassesParams {}

export { postcssSugarPluginLayoutClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginLayoutClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginLayoutClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
  * @name          s-container
  * @namespace          sugar.css.layout
  * @type               CssClass
  * @platform       css
  * @status         beta
  * 
  * This class allows you to apply the container styling to any HTMLElement
  * 
  * @example        html
  * <div class="s-container">
  *     <h1 class="s-h1">Hello world</h1>
  * </div>
  */
.s-container {
    @sugar.layout.container;
}`);

  const layouts = __theme().config('layout.layout');

  Object.keys(layouts).forEach((id) => {
    const layout = layouts[id];
    const colsCount = __unique(layout.split(/\n\s/)).length;
    vars.push(`
      /**
       * @name       s-grid:${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-grid\:${id}">
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
      .s-grid--${id} {
        @sugar.layout.grid(${layout}, $scope: bare);
      }
    `);
  });

  const spaces = __theme().config('space');

  Object.keys(spaces).forEach(spaceName => {

    const clsX = `s-grid:gutter-x-${spaceName}`.replace('-default','');
    const clsY = `s-grid:gutter-y-${spaceName}`.replace('-default','');
    const cls = `s-grid:gutter-${spaceName}`.replace('-default','');

    vars.push(`
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid\:123 ${clsX.replace(':', '\:')}">
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
      .${clsX.replace(':','--')} > * {
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
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid\:123 ${clsY.replace(':','\:')}">
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
        .${clsY.replace(':','--')} > * {
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
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid\:123 ${cls.replace(':','\:')}">
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
      .${cls.replace(':','--')} > * {
        padding: sugar.space(${spaceName});
      }
    `);
  });

  vars.push(`
     /**
       * @name       s-grid:gutter-between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to specify that you want only gutters between grid items
       * 
       * @example     html
       * <div class="s-grid\:123 s-grid\:gutter-between">
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
      .s-grid--gutter-between > * {
        &:first-child {
          padding-left: 0 !important;
        }
        &:last-child {
          padding-right: 0 !important;
        }
      }
  `);

  // align items
  ['start','end','center','stretch'].forEach(align => {
    vars.push(`
      /**
         * @name       s-grid:align-${align}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to align all the items to "${align}"
         * 
         * @example     html
         * <div class="s-grid\:123 s-grid\:align-${align}">
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
        .s-grid--align-${align} {
          align-items: ${align};
        }
    `);
  });

  // justify items
  ['start','end','center','stretch'].forEach(justify => {
    vars.push(`
      /**
         * @name       s-grid:justify-${justify}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to justify all the items to "${justify}"
         * 
         * @example     html
         * <div class="s-grid\:123 s-grid\:justify-${justify}">
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
        .s-grid--justify-${justify} {
          justify-items: ${justify};
        }
    `);
  });


  replaceWith(vars);
}
