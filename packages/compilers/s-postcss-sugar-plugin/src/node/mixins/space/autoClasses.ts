import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

class postcssSugarPluginSpaceAutoClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginSpaceAutoClassesParams {}

export { postcssSugarPluginSpaceAutoClassesInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginSpaceAutoClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginSpaceAutoClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const spacesObj = __theme().config('space');

  Object.keys(spacesObj).forEach((spaceName) => {
    // margins
    const clsMargin = `s-space-auto-${spaceName}`;
    vars.push(`/**
    * @name            .${clsMargin}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin} {
        @sugar.space.auto(${spaceName});
   }`);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
