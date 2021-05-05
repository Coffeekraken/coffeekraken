import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

class postcssSugarPluginTypoHInterface extends __SInterface {
  static definition = {
    level: {
      type: 'Number',
      required: true,
      alias: 'l'
    }
  };
}

export interface IPostcssSugarPluginTypoHParams {
  level: number;
}

export { postcssSugarPluginTypoHInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginTypoHParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginTypoHParams = {
    level: 1,
    ...params
  };

  const typoConfigObj = __theme().config(`typo.h${finalParams.level}`);

  if (!typoConfigObj)
    throw new Error(
      `<red>[postcssSugarPlugin.mixins.typo.h]</red> Sorry but the "<yellow>h${finalParams.level}</yellow>" title does not exists...`
    );

  const css = __jsObjectToCssProperties(typoConfigObj);

  const AST = processNested(css);
  atRule.replaceWith(AST);
}
