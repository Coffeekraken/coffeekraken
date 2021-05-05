import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginGradientInterface extends __SInterface {
  static definition = {
    start: {
      type: 'String',
      required: true,
      alias: 's'
    },
    end: {
      type: 'String',
      required: true,
      alias: 'e'
    },
    type: {
      type: 'String',
      values: ['linear', 'radial'],
      default: 'linear'
    },
    angle: {
      type: 'Number | String',
      default: 0
    }
  };
}

export interface IPostcssSugarPluginGradientParams {
  start: string;
  end: string;
  type: string | 'linear' | 'radial';
  angle: string | number;
}

export { postcssSugarPluginGradientInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginGradientParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginGradientParams = {
    start: 'primary--50',
    end: 'primary--70',
    type: 'linear',
    angle: 0,
    ...params
  };

  let startColorVar = `var(--s-gradient-start-color-inline, sugar.color(${finalParams.start}))`;
  let endColorVar = `var(--s-gradient-end-color-inline, sugar.color(${finalParams.end}))`;
  let angleVar = `var(--s-gradient-angle-inline, ${finalParams.angle}deg)`;

  let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  if (finalParams.type === 'radial') {
    gradientCss = `background: radial-gradient(circle, ${startColorVar} 0%, ${endColorVar} 100%);`;
  }

  const vars: string[] = [gradientCss];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
