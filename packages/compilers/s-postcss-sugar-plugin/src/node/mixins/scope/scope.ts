import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';

class postcssSugarPluginScopeMixinInterface extends __SInterface {
  static definition = {
    scopes: {
      type: 'String',
      required: true,
      alias: 's'
    }
  };
}
export { postcssSugarPluginScopeMixinInterface as interface };

export interface postcssSugarPluginScopeMixinParams {
  scopes: string;
}

/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope(color) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams = <postcssSugarPluginScopeMixinParams>{
    scopes: '',
    ...(params ?? {})
  };

  // @ts-ignore
  if (!global._postcssSugarPluginScopeMixinScopesStack) {
    // @ts-ignore
    global._postcssSugarPluginScopeMixinScopesStack = [];
  }

  // @ts-ignore
  //   console.log('AD', scopes);
  global._postcssSugarPluginScopeMixinScopesStack.push(finalParams.scopes);

  const AST = processNested(
    atRule.nodes.map((node) => node.toString()).join('\n')
  );
  atRule.replaceWith(AST);

  // @ts-ignore
  global._postcssSugarPluginScopeMixinScopesStack =
    // @ts-ignore
    global._postcssSugarPluginScopeMixinScopesStack.slice(0, -1);
}
