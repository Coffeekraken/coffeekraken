import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
import __postcss from 'postcss';

/**
 * @name           classes
 * @namespace      node.mixins.media
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 * 
 * Take this as an example:
 * 
 * ```css
 * .my-cool-element {
 *    color: red;
 * }
 * \@sugar.media.classes(max-width: 1200px, myQuery) {
 *    .my-cool-element {
 *      color: green;
 *    }
 * }
 * ```
 * 
 * This wil generate these two classes:
 * - .my-cool-element: Always available
 * - .my-cool-element___myQuery: Available only in the myQuery media query context
 *
 * Note that you can use the @sugar.media mixin parameters syntax here in the first argument.
 * 
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.media.classes(tablet, myQuery) {
 *    // any classes you want to "duplicate" and generate
 *    // only for this media context...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
  static definition = {
      query: {
          type: 'String',
          required: true
      },
      name: {
          type: 'String',
          required: true
      }
  };
}

export interface IPostcssSugarPluginMediaMixinClassesParams {
    query: string;
    name: string;
}

export { postcssSugarPluginMediaClassesMixinInterface as interface };

export default function ({
  params,
  atRule,
  postcssApi,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
  atRule: any;
  postcssApi: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginMediaMixinClassesParams = {
    query: '',
    name: '',
    ...params
  };

  atRule.nodes.forEach(node => {
    if (!node.selector) return;
    const selectorParts = node.selector.split(' ');
    selectorParts[0] = `${selectorParts[0]}@${finalParams.name}`;
    node.selectors[0] = selectorParts[0];
    node.selector = selectorParts.join(' ');
  });

  const mediaRule = new postcssApi.AtRule({
      name: 'sugar.media',
      params: `(${finalParams.query})`
  });

//   console.log('NO', atRule);

  // @ts-ignore
  atRule.nodes.forEach(node => {
    //   node.parent = AST.nodes[0];
    mediaRule.append(node);
  });

//   console.log(AST.nodes);

//   console.log(mediaRule.nodes);

    atRule.replaceWith(mediaRule);

    mediaRule.before(new postcssApi.Comment({
        text: `@sugar-media-classes-${finalParams.name}`
    }));

//   console.log(atRule.nodes);

//   const vars: string[] = [`
//     @sugar.media(${finalParams.query}) {

//     }
//   `];

//   replaceWith(vars);
}
