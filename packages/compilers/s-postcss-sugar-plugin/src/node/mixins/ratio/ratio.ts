import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginRatioInterface extends __SInterface {
  static definition = {
    ratio: {
      type: 'Number',
      required: true,
      alias: 'd'
    }
  };
}

export interface IPostcssSugarPluginRatioParams {
  ratio: number;
}

export { postcssSugarPluginRatioInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginRatioParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginRatioParams = {
    ratio: 1,
    ...params
  };

  const vars: string[] = [
    `
    position: relative;
    &::before {
        content: '';
        display: block;
        box-sizing: content-box;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% / ${finalParams.ratio});
    }Pindex.css
    & > *:not[class*="s-center-"] {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }
  `
  ];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
