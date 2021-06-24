import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
import __postcss from 'postcss';

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
