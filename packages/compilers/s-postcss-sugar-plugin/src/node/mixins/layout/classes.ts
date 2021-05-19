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
  processNested
}: {
  params: Partial<IPostcssSugarPluginLayoutClassesParams>;
  atRule: any;
  processNested: Function;
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
       * @name       s-layout-${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container">
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
      .s-layout-${id} {
        @sugar.layout('${layout}');
      }
    `);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
