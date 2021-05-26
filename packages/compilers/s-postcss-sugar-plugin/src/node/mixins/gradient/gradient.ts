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
    x: {
      type: 'String'
    },
    y: {
      type: 'String'
    },
    angle: {
      type: 'Number | String',
      default: 0
    },
    size: {
      type: 'String',
      default: 'farthest-side'
    }
  };
}

export interface IPostcssSugarPluginGradientParams {
  start: string;
  end: string;
  x: string;
  y: string;
  type: string | 'linear' | 'radial';
  angle: string | number;
  size: string;
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
    start: undefined,
    end: undefined,
    x: '50%',
    y: '50%',
    type: 'linear',
    angle: 0,
    size: 'farthest-side',
    ...params
  };

  let startColorVar = finalParams.start,
    endColorVar = finalParams.end;

  startColorVar = `sugar.color(${finalParams.start})`;
  endColorVar = `sugar.color(${finalParams.end})`;
  const angleVar = `${finalParams.angle}deg`;

  let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  if (finalParams.type === 'radial') {
    gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  }

  const vars: string[] = [gradientCss];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
