import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      required: true
    },
    toColor: {
      type: 'String',
      required: true
    }
  };
}
export { postcssSugarPluginColorRemapMixinInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.colors
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to (re)map a color to another one like saying you want the "warning" color as the "primary" one
 *
 * @param       {String}        color           The color you want to map on another one
 * @param       {String}        toColor         THe color you want to override with the previous one
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color.map(warning, primary);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPostcssSugarPluginColorRemapParams {
  color: string;
  toColor: string;
}

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginColorRemapParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginColorRemapParams = {
    color: '',
    toColor: '',
    ...params
  };
  const colorsObj = __theme().config('color');

  const cssArray: string[] = [];

  cssArray.push(`
    --s-theme-color-${finalParams.color}-default: var(--s-theme-color-${finalParams.toColor}-default);
    --s-theme-color-${finalParams.color}-default-h: var(--s-theme-color-${finalParams.toColor}-default-h);
    --s-theme-color-${finalParams.color}-default-s: var(--s-theme-color-${finalParams.toColor}-default-s);
    --s-theme-color-${finalParams.color}-default-l: var(--s-theme-color-${finalParams.toColor}-default-l);
  `);

  if (atRule.parent.type === 'root') {
    cssArray.unshift(':root {');
    cssArray.push('}');
  }

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
