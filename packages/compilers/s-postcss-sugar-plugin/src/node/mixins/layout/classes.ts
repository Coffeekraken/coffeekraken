import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

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
       * @name       s-grid--${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-grid--${id}">
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
        @sugar.layout.grid('${layout}');
      }
    `);
  });

  const spaces = __theme().config('space');

  Object.keys(spaces).forEach(spaceName => {

    const clsX = `s-grid--gutter-x-${spaceName}`.replace('-default','');
    const clsY = `s-grid--gutter-y-${spaceName}`.replace('-default','');
    const cls = `s-grid--gutter-${spaceName}`.replace('-default','');

    vars.push(`
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid--123 ${clsX}">
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
      .${clsX} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `);

    vars.push(`
      /**
       * @name       ${clsY}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid--123 ${clsY}">
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
        .${clsY} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `);

    vars.push(`
      /**
       * @name       ${cls}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid--123 ${cls}">
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
      .${cls} > * {
        padding: sugar.space(${spaceName});
      }
    `);
  });

  vars.push(`
     /**
       * @name       s-grid--gutter-between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to specify that you want only gutters between grid items
       * 
       * @example     html
       * <div class="s-grid--123 s-grid-gutter--between">
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


  replaceWith(vars);
}
